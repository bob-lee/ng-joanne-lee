'use strict';

/* image file naming / uploading convention

  1. assume the page want to show images in pair - image1 as parent and image2 as child
  2. upload image1 '[parent]' first, function to record its url in database.url
  3. upload image2 'of_[parent].[ext]', function to convert to thumb, record its url in database.thumbUrl
*/

const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
// Include a Service Account Key to use a Signed URL
const gcs = require('@google-cloud/storage')({ keyFilename: 'service-account-credentials.json' });
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

const ILLUST_PATH = '/illustration/';
// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 40;
const THUMB_MAX_WIDTH = 40;
const CONVERT_PREFIX = 'of_'; // image2 file would have this prefix, e.g. 'of_Sarah.jpeg.png', to delete after conversion
const THUMB_PREFIX = 'thumb_'; // converted thumb file of image2 would have this prefix, e.g. 'thumb_of_Sarah.jpeg.png'

exports.recordUrl = functions.storage.object().onChange(event => {
  // File and directory paths.
  const filePath = event.data.name;
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath); // e.g. 'Sarah.jpeg' or 'of_Sarah.jpeg.png'
  const toConvert = fileName.startsWith(CONVERT_PREFIX);
  const isThumb = fileName.startsWith(THUMB_PREFIX);

  // Exit if this is triggered on a file that is not an image.
  if (!event.data.contentType.startsWith('image/')) {
    //console.log('This is not an image.');
    return;
  }

  // Exit if this is a move or deletion event.
  if (event.data.resourceState === 'not_exists') {
    //console.log('This is a deletion event.');
    return;
  }

  if (isThumb) {
    //console.log('This is thumb.');
    return;
  }
  
  // Cloud Storage files.
  const bucket = gcs.bucket(event.data.bucket);
  const file = bucket.file(filePath);

  // Get the Signed URLs for the thumbnail and original image.
  const config = {
    action: 'read',
    expires: '03-01-2500'
  };

  if (!toConvert) { // image 1 uploaded, record its url and return
    file.getSignedUrl(config, function (err, url) {
      admin.database().ref(ILLUST_PATH).push({ fileName: fileName, url: url })
        .then(_ => console.log(`recorded url of '${fileName}' ok`));
    });
    return;
  }

  // image 2 uploaded, convert to thumb, record its url in database.thumbUrl

  const originalName = fileName.split('.').slice(0, -1).join('.').replace(CONVERT_PREFIX, ''); // get 'Sarah.jpeg' from 'of_Sarah.jpeg.png'

  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  const thumbFile = bucket.file(thumbFilePath);

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir).then(() => {
    // Download file from bucket.
    return file.download({destination: tempLocalFile});
  }).then(() => {
    //console.log('The file has been downloaded to', tempLocalFile);
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile]);
  }).then(() => {
    //console.log('Thumbnail created at', tempLocalThumbFile);
    // Uploading the Thumbnail.
    return bucket.upload(tempLocalThumbFile, {destination: thumbFilePath});
  }).then(() => {
    //console.log('Thumbnail uploaded to Storage at', thumbFilePath);
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);

    // Get the Signed URLs for the thumbnail and original image.
    const config = {
      action: 'read',
      expires: '03-01-2500'
    };
    return Promise.all([
      thumbFile.getSignedUrl(config),
    ]);
  }).then(results => {
    const originalResult = results[0];
    const fileUrl = originalResult[0];
    console.log(`got signed URL of thumb, looking for '${originalName}' in database`);

    // Add the URLs to the Database
    let key;
    return admin.database().ref('illustration')
      .orderByChild('fileName')
      .equalTo(originalName)
      .once('value')
      .then(snap => {
        snap.forEach(i => {
          //console.log(`found key(${i.key})`);
          if (i.key) {
            key = i.key;
          }
        });

        if (key && fileUrl) {
          return admin.database().ref(ILLUST_PATH + key).update({ 'thumbUrl': fileUrl });
        } else {
          return Promise.reject(`couldn't find '${originalName}' in database`);
        }
      });
      
  }).then(_ => file.delete())
  .then(_ => console.log(`removed file '${fileName}' ok`))
  .catch(error => console.error(error));

});