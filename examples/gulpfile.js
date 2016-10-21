var gulp = require('gulp')
var mjml = require('../src/index')

gulp.task('default', function () {
  gulp.src('./test.mjml')
    .pipe(mjml())
    .pipe(gulp.dest('./html'))
})
