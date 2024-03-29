/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014, Groupon, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var webpack = require('webpack');
module.exports = function(config){
  return {
    entry: config.entry,
    output: config.output,
    target: "node",
    module: {
      loaders: [
        {
          test: /\.(json)$/,
          loader: 'json-loader'
        },
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loaders: ['babel-loader']
        },
        { test: /\.elm$/, 
          loader: "elm-webpack" 
        }
      ]
    },
    devtool: config.debug ? '#inline-source-map' : false,
    plugins: config.debug ? [] : [
      new webpack.EnvironmentPlugin('NODE_ENV'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(
        {
          compressor: {
            screw_ie8: true,
            warnings: false
          }
        }
      ),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
    ]

  };
};
