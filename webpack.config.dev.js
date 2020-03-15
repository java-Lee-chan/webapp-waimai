const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
  resolve: {
    alias: {
      '@': path.resolve(srcRoot),
      'react-dom': '@hot-loader/react-dom'
    },
    extensions: ['.js', '.json', '.jsx']
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
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader', 
          {
            loader: 'sass-resources-loader',
            options: {
              resources: srcRoot + '/component/common.scss'
            }
          }
        ],
        include: srcRoot
      },
      {
        test: /\.(png|gif|jpe?g)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          esModule: false
        },
        include: srcRoot
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(jsx?)$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        include: srcRoot,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    ...htmlArray,
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: devPath,
    compress: true,
    port: 3000,
    open: true,
    hot: true
  }
}