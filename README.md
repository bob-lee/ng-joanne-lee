# Joanne Lee

This is Joanne's website, shows images of her works. Images are served from the `Firebase storage` and below is the convention to follow when naming and uploading image files:

- assume the page want to show images in pair - image1 as parent and image2 as child (optional)
- images are ideally square, crop if required, then optimize using a tool like `tinyjpg.com`
- give unique name to image1, e.g. `Sarah.jpg`
- give unique name to image2, e.g. `of_Sarah.jpg.jpg`
- optionally prepare `webp` version of image1, name it like `Sarah.jpg.webp`

1. create a folder like `illustration` in `storage`
2. upload image1 first, `function` to record its url in database.`url`
3. upload `webp` version of image1, `function` to record its url in database.`webpUrl`
4. upload image2, `function` to convert to thumb, record its url in database.`thumbUrl`
5. The `illustration` page to look for images' urls under `illustration` in database

The website was built and deployed using following technologies: 
* [Angular](https://angular.io/): frontend framework
* [Angular Mobile Toolkit](https://github.com/angular/mobile-toolkit): progressive web app and service worker for offline capability
* [Firebase](https://firebase.google.com/): cloud infrastructure - No-SQL database, storage, fucntions and hosting
* [Node.js](https://nodejs.org): JavaScript runtime environment

[Visit the web!](https://joanne-lee.firebaseapp.com/home)

For development, clone the repo and run `npm i` to install dependencies, then `ng serve --prod`. Navigate to `http://localhost:4200/`.

### Author
* [Bob Lee](mailto:bob.bumsuk.lee@gmail.com)
