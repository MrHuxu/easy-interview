var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    react = require('gulp-react'),
    shell = require('gulp-shell');

gulp.task('js', function () {
  gulp.src([
      './public/bower_components/jquery/dist/jquery.min.js',
      './public/bower_components/bootstrap/dist/js/bootstrap.min.js',
      './public/bower_components/react/react.min.js',
      './public/bower_components/react/JSXTransformer.js',
      './public/bower_components/react-router/build/umd/ReactRouter.min.js',
      './public/bower_components/marked/marked.min.js',
      './public/bower_components/highlightjs/highlight.pack.js',
      './public/javascripts/common.js',
      './public/javascripts/*component.js',
      './public/javascripts/blog_routes.js'
    ])
    .pipe(react())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('css', function () {
  gulp.src([
      './public/bower_components/highlightjs/styles/tomorrow-night-eighties.css',
      './public/bower_components/nprogress/nprogress.css',
      './public/stylesheets/*.css'
    ])
    .pipe(concatCss('all.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('compress', ['js', 'css'], function () {});

gulp.task('prd', shell.task('NODE_ENV=production forever start bin/www'));

gulp.task('dev', function () {
  nodemon({
    script: './bin/www'
  }).on('restart', function () {
    console.log('server restarted!');
  });
});
