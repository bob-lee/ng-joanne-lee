# Joanne Lee

This is Joanne's website, shows images of her works. Images are served from the `Firebase storage` and below is the convention to follow when naming and uploading image files:

- assume the page want to show images in pair - image1 as parent and image2 as child (optional)
- image2 needs to be square, so crop if required
- give unique name to image1, e.g. `Sarah.jpg`
- give unique name to image2, e.g. `of_Sarah.jpg.jpg`

1. create a folder like `illustration` in `storage`
2. upload image1 first, `function` to record its url in database.`url`
3. upload image2, `function` to convert to thumb, record its url in database.`thumbUrl`
4. The `illustration` page to look for images' urls under `illustration` in database

The website was built and deployed using following technologies: 
* [Angular](https://angular.io/): frontend framework
* ~~[Angular Mobile Toolkit](https://github.com/angular/mobile-toolkit): progressive web app and service worker for offline capability~~
* [Workbox](https://workboxjs.org/): JavaScript libraries for Progressive Web Apps

* [Firebase](https://firebase.google.com/): cloud infrastructure - No-SQL database, storage, fucntions and hosting
* [Node.js](https://nodejs.org): JavaScript runtime environment

[Visit the web!](https://joanne-lee.firebaseapp.com/home)

For development, run `npm run build:ssr` to build and run `npm run serve` to test it on `localhost:5000` or run `firebase deploy` to deploy the web.

```
// to install dependencies
npm i
// to debug on localhost:4200
ng serve
// to run tests
ng test
// to build for production
npm run build:ssr
// to test on localhost:5000 with production build
npm run serve
```