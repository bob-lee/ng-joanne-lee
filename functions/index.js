'use strict';

/* image file naming / uploading convention

  0. assume the page want to show images in pair - image1 as parent and image2 as child (optional)
  0a. images are ideally square, so crop if required, then optimize using a tool like tinyjpg.com
  0b. give unique name to image1, e.g. 'Sarah.jpg'
  0c. give unique name to image2, e.g. 'of_Sarah.jpg.jpg'
  0d. optionally prepare web version of image1, name it like 'Sarah.jpg.webp'

  1. create a folder like 'illustration' in storage
  2. upload image1 first, function to record its url in database.url
  3. upload webp version of image1, function to record its url in database.webpUrl
  4. upload image2, function to convert to thumb, record its url in database.thumbUrl
  5. The 'illustration' page to look for images' urls under 'illustration' in database
*/

const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
// Include a Service Account Key to use a Signed URL
const gcs = require('@google-cloud/storage')({ keyFilename: 'service-account-credentials.json' });
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp(functions.config().firebase);
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 80;
const THUMB_MAX_WIDTH = 80;
const CONVERT_PREFIX = 'of_'; // image2 file would have this prefix, e.g. 'of_Sarah.jpg.jpg', to delete after conversion
const THUMB_PREFIX = 'thumb_'; // converted thumb file of image2 would have this prefix, e.g. 'thumb_of_Sarah.jpg.jpg'
const WEBP_EXT = 'webp';
const WEBP_QUALITY = 80;

exports.recordUrl = functions.storage.object().onChange(event => {
  // File and directory paths.
  const filePath = event.data.name; // 'illustration/Sarah.jpg'
  const fileDir = path.dirname(filePath); // 'illustration'
  const fileName = path.basename(filePath); // e.g. 'Sarah.jpg' or 'of_Sarah.jpg.jpg'
  const fileExt = fileName.split('.').splice(-1).join().toLowerCase();
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

  if (!toConvert) { // image 1
    if (fileExt === 'webp') { // webp version of image1 uploaded, find in database and record its url into database.webpUrl
      const originalName = fileName.split('.').slice(0, -1).join('.'); // get 'Sarah.jpg' from 'Sarah.jpg.webp'

      return file.getSignedUrl(config, function (err, url) {
        let key;
        admin.database().ref(fileDir)
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

            if (key) {
              admin.database().ref(`/${fileDir}/${key}`).update({ 'webpUrl': url })
                .then(_ => console.log(`recorded webp url of '${fileName}' ok`));
            } else {
              console.error(`couldn't find '${originalName}' in database to record webp url`);
              // should delete the file here?
            }
          });
      });
    } else { // image 1 uploaded, record its url into database.url
      return file.getSignedUrl(config, function (err, url) {
        admin.database().ref(fileDir).push({ fileName: fileName, url: url })
          .then(_ => console.log(`recorded url of '${fileName}' ok`));
        
        // await admin.database().ref(fileDir).push({ fileName: fileName, url: url });
        // console.log(`recorded url of '${fileName}' ok`);
      });
    }

  }

  // image 2 uploaded, convert to thumb, record its url into database.thumbUrl

  const originalName = fileName.split('.').slice(0, -1).join('.').replace(CONVERT_PREFIX, ''); // get 'Sarah.jpg' from 'of_Sarah.jpg.jpg'

  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  const thumbFile = bucket.file(thumbFilePath);

  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir).then(() => {
    // Download file from bucket.
    return file.download({ destination: tempLocalFile });
  }).then(() => {
    //console.log('The file has been downloaded to', tempLocalFile);
    // Generate a thumbnail using ImageMagick.
    return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile]);
  }).then(() => {
    //console.log('Thumbnail created at', tempLocalThumbFile);
    // Uploading the Thumbnail.
    return bucket.upload(tempLocalThumbFile, { destination: thumbFilePath });
  }).then(() => {
    //console.log('Thumbnail uploaded to Storage at', thumbFilePath);
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalThumbFile);

    // Get the Signed URLs for the thumbnail and original image.
    return Promise.all([
      thumbFile.getSignedUrl(config),
    ]);
  }).then(results => {
    const originalResult = results[0];
    const fileUrl = originalResult[0];
    console.log(`got signed URL of thumb, looking for '${originalName}' in database`);

    // Add the URLs to the Database
    let key;
    return admin.database().ref(fileDir)
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
          return admin.database().ref(`/${fileDir}/${key}`).update({ 'thumbUrl': fileUrl });
        } else {
          return Promise.reject(`couldn't find '${originalName}' in database`);
        }
      });

  }).then(_ => file.delete())
    .then(_ => console.log(`removed file '${fileName}' ok`))
    .catch(error => console.error('image2', error));

});

exports.getUrls = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const params = req.url.split('/');
    const group = params[1];
  
    admin.database().ref(group).once('value')
      .then(snapshot => {
        const list = [];
        snapshot.forEach(item => {
          const i = item.val();
          list.push(i);
        });
        //console.log('getUrls', group, list.length);
        res.status(200).json(list);
      });
  });
});