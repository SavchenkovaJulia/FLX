const { src, dest, task, series, watch } = require('gulp');
const less = require('gulp-less');
const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

let serverTask = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
};

task('img-compress', () =>
  src('src/img/*')
    .pipe(imagemin())
    .pipe(dest('dist/img'))
);

task('minifyHtml', () => {
  return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
});

task('less', () => {
  return src('./src/less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'));
});

task('js', () => {
  return src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/js'));
});

task('reload', function(done) {
  browserSync.reload();
  done();
});

task('build', series('js', 'less', 'minifyHtml', 'img-compress'));

exports.serve = () => {
  serverTask();
  watch('dist/*.html', series('minifyHtml', 'reload'));
  watch('src/js/*.js', series('js', 'reload'));
  watch('src/less/*.less', series('less', 'reload'));
  watch('src/js/*.js', series('js', 'reload'));
};
