const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
	const isDevMode = argv.mode === 'development';

	return {
		entry: './src/pages/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'main.js',
			clean: true,
		},
		devServer: {
			static: {
				directory: path.join(__dirname, 'dist'),
			},
			compress: true,
			port: 9000,
			open: true,
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
				{
					test: /\.css$/,
					use: [
						isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader',
					],
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					type: 'asset/resource',
					generator: {
						filename: 'images/[name][ext][query]'
					}
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					type: 'asset/resource',
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './src/index.html',
			}),
			new MiniCssExtractPlugin(),
		],
		optimization: {
			minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
		},
	};
};
