var webpack = require('webpack');
var path = require('path');

const DEBUG = !process.argv.includes('--release');

console.log('__dirname : ' + __dirname);
module.exports = {
	entry: {
		index: './src/js/index.js',
	},
	output: {
		filename: '[name].js'
	},
	module: {
		rules: [
			// { test: /\.json$/, loader: "json" },
			{ test: /\.js$/,
        exclude: /node_modules/, 
        // exclude: /node_modules/,
        use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }
        ]
      }
		]
	},
	plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
    //new webpack.optimize.UglifyJsPlugin(),
  ],
	devtool: DEBUG ? 'sourcemap' : false
};