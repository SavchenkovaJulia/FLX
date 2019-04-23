const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/img',
        to: 'img'
      },
      { from: 'src/index.html', to: 'index.html' }
    ]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new ExtractTextPlugin('styles/style.css')
  ],
  devServer: {
    contentBase: './'
  },
  devtool: 'eval-source-map'
};
