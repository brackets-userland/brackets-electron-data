const gulp = require('gulp');
const path = require('path');
const watch = require('gulp-watch');

const HTML_GLOB = 'src/**/*.html';

function buildHtml() {
  return gulp.src(HTML_GLOB).pipe(gulp.dest('dist'));
}

gulp.task('build', () => {
  buildHtml();
});

gulp.task('watch', ['build'], () => {
  watch(HTML_GLOB, () => buildHtml());
});

gulp.task('default', ['build']);
