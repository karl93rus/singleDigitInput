const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    // library: 'SinChar',
    // libraryExport: '',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    minimize: false
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