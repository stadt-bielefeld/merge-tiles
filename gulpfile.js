'use strict';

let gulpDocumentation = require('gulp-documentation');

let gulp = require('gulp');
let packageJSON = require(__dirname + '/package.json');

gulp.task('docs', function() {
  return gulp.src(__dirname + '/src/**/*.js')
    .pipe(gulpDocumentation('html', {}, {
      name: packageJSON.name,
      version: packageJSON.version
    }))
    .pipe(gulp.dest(__dirname + '/docs'));
});

gulp.task('watch', function() {
  gulp.watch(__dirname + '/src/**/*.js', ['docs']);
});

gulp.task('default', ['watch', 'docs']);
