var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

gulp.task('dev', function () {
  nodemon({
    script: './bin/www'
  }).on('restart', function () {
    console.log('server restarted!');
  });
});
