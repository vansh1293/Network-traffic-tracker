import path from 'path';
import Dotenv from 'dotenv-webpack';

export default {
  mode: 'production',
  entry: './src/Appwrite.js',
  output: {
    path: path.resolve(path.dirname(new URL(import.meta.url).pathname), 'dist'),
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
          },
        },
      },
    ],
  },
  plugins: [
    new Dotenv()
  ]
};