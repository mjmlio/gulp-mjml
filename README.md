
# Gulp MJML

Add Gulp to your MJML workflow!

## Usage:

> With an MJML file named `test.mjml`, render your emails to an html folder:

``` javascript

var gulp = require('gulp');
var mjml = require('gulp-mjml');

gulp.task('default', function () {
  return gulp.src('./test.mjml')
    .pipe(mjml())
    .pipe(gulp.dest('./html'));
});

```

> If you have custom components linked to your own mjmlEngine, you can pass it to the gulp task so it uses your engine to render the html:

``` javascript

var gulp = require('gulp');
var mjml = require('gulp-mjml');

// Require your own components if needed, and your mjmlEngine
// require('./components')
var mjmlEngine = require('mjml');

gulp.task('default', function () {
  return gulp.src('./test.mjml')
    .pipe(mjml(mjmlEngine))
    .pipe(gulp.dest('./html'));
});

```
