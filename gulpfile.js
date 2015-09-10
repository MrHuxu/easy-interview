var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    react = require('gulp-react'),
    shell = require('gulp-shell');

var jsLibs = [
  './public/bower_components/jquery/dist/jquery.js',
  './public/bower_components/react/react-with-addons.js',
  './public/bower_components/react/JSXTransformer.js',
  './public/bower_components/flux/dist/Flux.js',
  './public/bower_components/react-router/build/umd/ReactRouter.js',
  './public/bower_components/semantic-ui/dist/semantic.min.js',
  './public/bower_components/microevents/microevent.js'
];

var jsFiles = [
  './public/javascripts/app_dispatcher.js',
  './public/javascripts/message_store.js',
  './public/javascripts/auth_store.js',
  './public/javascripts/auth_actions.js',
  './public/javascripts/question_store.js',
  './public/javascripts/question_actions.js',
  './public/javascripts/message_component.js',
  './public/javascripts/navbar_component.js',
  './public/javascripts/question_filter_component.js',
  './public/javascripts/question_list_component.js',
  './public/javascripts/dashboard_component.js',
  './public/javascripts/edit_user_component.js',
  './public/javascripts/signup_component.js',
  './public/javascripts/update_user_component.js',
  './public/javascripts/login_component.js',
  './public/javascripts/edit_question_component.js',
  './public/javascripts/preview_question_component.js',
  './public/javascripts/home_component.js',
  './public/javascripts/main_router.js'
];

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
