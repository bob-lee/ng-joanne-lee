import { WorkboxBuild, Manifest } from './workbox.types';
import * as fs from 'fs-extra';

const workbox: WorkboxBuild = require('workbox-build');

/**
 * Copy workbox from npm
 */
async function copyWorkbox() {
  const cwd = process.cwd();
  const pkgPath = `${cwd}/node_modules/workbox-sw/package.json`;
  const pkg = require(pkgPath);

  // const main = pkg.main.replace(/prod/, 'dev'); // dev for debug
  // const readPathMap = `${cwd}/node_modules/workbox-sw/${main}.map`;
  // const dataMap = fs.readFileSync(readPathMap, 'utf8');
  // const pathMap = `${cwd}/dist/workbox-sw.dev.v2.1.0.js.map`;
  // const readPath = `${cwd}/node_modules/workbox-sw/${main}`;
  
  const readPath = `${cwd}/node_modules/workbox-sw/${pkg.main}`;
  const data = fs.readFileSync(readPath, 'utf8');
  const path = `${cwd}/dist/workbox-sw.js`;
  return [
    { data, path },
    //{ data:dataMap, path:pathMap }
  ];
}

/**
 * Build Steps
 *  (assume tsc has ran)
 *  - Copy assets from npm
 *  - Generate SW entries
 *  - Generate SW from entries
 */
async function build() {
  const wb = await copyWorkbox();
  await wb.map(file => {
    console.log(`Writing ${file.path}.`);
    return fs.writeFileSync(file.path, file.data, 'utf8');
  });

  return workbox.injectManifest({
    globDirectory: './dist/',
    globPatterns: ['**\/*.{html,js,css,png,jpg,svg}'],
    globIgnores: ['build/*'],
    swSrc: './src/sw-template.js',
    swDest: './dist/sw-default.js',
  });
}

try {
  build();
} catch(e) {
  console.log(e);
}
