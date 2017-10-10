const input = `./functions/dist-server/main.bundle`;
const output = `./functions/dist-server/main.repack.bundle.js`;

module.exports = {
  target: 'node',
  entry: input,
  output: { filename: output, libraryTarget: 'commonjs' },
}

