
# Gulp MJML

Add Gulp to your MJML workflow!

## Usage:

> With an MJML file named `test.mjml`, render your emails to an html folder:

``` javascript

var gulp = require('gulp');
var mjml = require('gulp-mjml')

gulp.task('default', function () {
  gulp.src('./test.mjml')
    .pipe(mjml())
    .pipe(gulp.dest('./html'))
});

```

