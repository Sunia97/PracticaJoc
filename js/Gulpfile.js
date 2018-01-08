var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var less = require('gulp-less');
var htmlmin = require('gulp-html-minifier2');
var beautify = require('gulp-beautify');
var imagemin = require('gulp-imagemin');


gulp.task('beautify', function() {
  gulp.src('css/*.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('build/styles'))
});

gulp.task('images', function(){
  return gulp.src('media/images/**/*.+(png)')
  .pipe(imagemin())
  .pipe(gulp.dest('build/images'))
});

gulp.task('html', function(){
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
});

gulp.task('css', function(){
  return gulp.src('css/*.css')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('default', [ 'html', 'css' ]);
