'use strict'
const prefixer = require('gulp-autoprefixer')
const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
// var rimraf = require('gulp-rimraf')
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat')
var plumber = require('gulp-plumber');


gulp.task('default', ['watch', 'sass', 'js', 'html']);

gulp.task('sass', (done)=>{
  gulp.src('./client/sass/*.scss')
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(prefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(clean())
  .pipe(gulp.dest('./public/stylesheets'))
  .on('end', done) 
})

gulp.task('watch', () =>{
  gulp.watch('./client/sass/*.scss', ['sass']);
  gulp.watch('client/js/**/*.js', ['js']);
  gulp.watch('client/html/**/*.html', ['html']);

})

gulp.task('js', ['clean:js'], function() {
  return gulp.src('client/js/**/*.js')
  .pipe(plumber())
  .pipe(ngAnnotate())
  .pipe(babel({presets:['es2015']}))
  .pipe(concat('bundle.js'))
  // .pipe(uglify())
  .pipe(gulp.dest('public/js'));
});

//  deletes all generated files living in 'public' dir
gulp.task('clean:js', function() {
  return gulp.src('public/js', {read:false})
  .pipe(plumber())
    // .pipe(rimraf());
  })

gulp.task('html', function() {
  return gulp.src('client/html/**/*.html')
  .pipe(gulp.dest('public/html'));
});




