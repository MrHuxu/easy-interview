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
  './public/bower_components/microevents/microevent.js',
  './public/bower_components/marked/marked.min.js'
];

var jsFiles = [
  './public/javascripts/dispatcher/AppDispatcher.js',
  './public/javascripts/stores/MessageStore.js',
  './public/javascripts/stores/AuthStore.js',
  './public/javascripts/actions/AuthActions.js',
  './public/javascripts/stores/QuestionStore.js',
  './public/javascripts/actions/QuestionActions.js',
  './public/javascripts/components/Message.react.js',
  './public/javascripts/components/Navbar.react.js',
  './public/javascripts/components/QuestionFilter.react.js',
  './public/javascripts/components/QuestionList.react.js',
  './public/javascripts/components/Dashboard.react.js',
  './public/javascripts/components/EditUser.react.js',
  './public/javascripts/components/Signup.react.js',
  './public/javascripts/components/UpdateUser.react.js',
  './public/javascripts/components/Login.react.js',
  './public/javascripts/components/EditQuestion.react.js',
  './public/javascripts/components/PreviewQuestion.react.js',
  './public/javascripts/components/Home.react.js',
  './public/javascripts/app.js'
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
