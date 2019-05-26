# Joanne Lee

This is Joanne's website, shows her works. Images are dynamically served from `Firebase storage` and lazily loaded using `IntersectionObserver` API. All resources are cached by `workbox` service worker that makes the web faster on next visit and even when user lost the internet.

<img src="Joanne-profile.PNG" width="60%">

Below is the convention to follow when naming and uploading image files:

- assume the page wants to show images in pair - image1 as parent and image2 as child (optional)
- image2 needs to be square, so crop if required
- give unique name to image1, e.g. `Sarah.jpg`
- give unique name to image2, e.g. `of_Sarah.jpg.jpg`

1. create a folder like `portrait` in `storage`
2. upload image1 first, `recordUrl` function to add a new record in database with `url` field
3. upload image2, `recordUrl` function to convert it to thumb, record its url on `thumbUrl` field
4. The `portrait` page to show image1 and image2 using urls on `url` and `thumbUrl` fields in database

The website was built and deployed using following technologies: 
* [Angular](https://angular.io/): frontend framework
* [Workbox](https://workboxjs.org/): JavaScript libraries for Progressive Web Apps
* [Firebase](https://firebase.google.com/): cloud infrastructure for database, storage, fucntions and hosting
* [Node.js](https://nodejs.org): JavaScript runtime environment

[Visit the web!](https://joanne-lee.firebaseapp.com/home)

For development, run `yarn serve` to build and test it on `localhost:5000` or run `firebase deploy` to deploy the web.

```
// to install dependencies
yarn
// to debug on localhost:4200
ng serve
// to run tests
ng test
// to build for production
yarn build
// to test on localhost:5000 with production build
yarn serve
```