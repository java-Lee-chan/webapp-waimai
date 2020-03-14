const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, 'dev');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';

function getHtmlArray(entryMap) {
  let htmlArray = [];
  Object.keys(entryMap).forEach((key) => {
    let fullPathName = path.resolve(pageDir, key);
    let fileName = path.resolve(fullPathName, key + '.html');

    if (fs.existsSync(fileName)) {
      htmlArray.push(new HtmlWebpackPlugin({
        filename: key + '.html',
        template: fileName,
        chunks: [key]
      }));
    }
  });

  return htmlArray
}

function getEntry() {
  let entryMap = {};

  fs.readdirSync(pageDir).forEach((pathname) => {
    let fullPathName = path.resolve(pageDir, pathname);
    let stat = fs.statSync(fullPathName);
    let fileName = path.resolve(fullPathName, mainFile);

    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName;
    }
  });

  return entryMap
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
  mode: 'development',
  entry: entryMap,
  output: {
    path: devPath,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: srcRoot
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: srcRoot
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024
        },
        include: srcRoot
      },
      {
        test: /\.(jsx?)$/,
        loader: 'babel-loader',
        include: srcRoot,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    ...htmlArray
  ],
  devServer: {
    contentBase: devPath,
    compress: true,
    port: 3000,
    open: true
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}