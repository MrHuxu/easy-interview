var gulp             = require('gulp');
var nodemon          = require('gulp-nodemon');
var shell            = require('gulp-shell');
var gutil            = require('gulp-util');
var webpack          = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig    = require('./webpack.config');

gulp.task("webpack", function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString());
      callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  webpackConfig.plugins = [new webpack.HotModuleReplacementPlugin()];
  var compiler = webpack(webpackConfig);
  new webpackDevServer(compiler, {
    hot        : true,
    stats      : { colors : true },
    publicPath : '/assets/'
  }).listen(6789, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:6789/assets/bundle.js");
    callback();
  });
});

gulp.task('prd', ['webpack'], shell.task('NODE_ENV=production forever start server/bin/www --harmony'));

gulp.task('dev', ['webpack-dev-server'], shell.task('nodemon server/bin/www --harmony'));
