const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/appwrite.js', // Entry point for your Appwrite logic
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'appwrite.bundle.js', // Bundled output
  },
};
