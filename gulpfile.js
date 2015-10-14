var gulp = require('gulp'),
    path = require('path'),
    nodemon = require('gulp-nodemon'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    react = require('gulp-react'),
    shell = require('gulp-shell');
    gutil = require('gulp-util');
    webpack = require("webpack");
    WebpackDevServer = require("webpack-dev-server");

/*
gulp.task('js', function () {
  gulp.src(jsLibs.concat(jsFiles))
    .pipe(react())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('css', function () {
  gulp.src([
      './public/bower_components/semantic-ui/dist/semantic.min.css',
      './public/stylesheets/*.css'
    ])
    .pipe(concatCss('all.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('compress', ['js', 'css'], function () {});

gulp.task('prd', ['compress'], shell.task('NODE_ENV=production forever start bin/www'));

gulp.task('dev', function () {
  nodemon({
    script: './bin/www'
  }).on('restart', function () {
    console.log('server restarted!');
  });
});
*/

var webpackEntry = { app: ['webpack/hot/dev-server', './public/javascripts/index.js'] };
var webpackModule = {
  loaders: [
    { test: /\.js$/, loader: 'babel-loader' },
    { test: /\.css$/, loader: 'style-loader!css-loader' },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
    { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' }
  ]
};
var webpackPlugins = [
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin()
];

gulp.task("webpack", function(callback) {
  webpack({
    entry   : webpackEntry,
    module  : webpackModule,
    plugins : webpackPlugins,
    output : {
      path: './public/built',
      filename: 'bundle.js',
      publicPath: './public/built'
    }
  }, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString());
      callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  var compiler = webpack({
    entry  : webpackEntry,
    module : webpackModule,
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output : {
      path: path.join(__dirname, "built"),
      filename: 'bundle.js'
    }
  });

  new WebpackDevServer(compiler, {}).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8080/bundle.js");
    //keep the server alive or continue?
    callback();
  });
});

gulp.task('prd', ['webpack'], shell.task('NODE_ENV=production forever start bin/www'));

gulp.task('dev', ['webpack-dev-server'], shell.task('node bin/www --harmony'));
