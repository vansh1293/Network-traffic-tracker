const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  entry: './src/appwrite.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'appwrite.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceType: 'module', // Explicitly set sourceType as 'module'
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv()
  ]
};
