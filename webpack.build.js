const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		libraryTarget: 'umd',
		environment: {
			arrowFunction: false,
		}
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimize: true,
  },
  module: {
		rules: [
			{
				test: /(\.ts)$|(\.js)$/,
				exclude: /node_modules/,
				loader: "ts-loader"
			},
		]
	},
}