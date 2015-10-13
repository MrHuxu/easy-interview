var webpack = require('webpack');

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', './public/javascripts/index.js']
  },

  output: {
    path: './public/built',
    filename: 'bundle.js',
    publicPath: './public/dist'
  },

  devServer: {
    contentBase: './public',
    publicPath: 'http://localhost:8080/built/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}
