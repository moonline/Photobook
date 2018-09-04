const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
	entry: APP_DIR + '/index',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, use: 'ts-loader' },
			{ test:/\.s?css$/, use:['style-loader','css-loader', 'sass-loader'] }
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.jsx', '.js' ]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	],
	target: "electron"
};
