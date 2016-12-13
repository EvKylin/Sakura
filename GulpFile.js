const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');
//const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

const watch = require('gulp-watch');

// CSS
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssmin = require('gulp-clean-css');

const pkg = require('./package.json');

// 配置文件结构目录
const path = {
  app: 'assets',
  dist: 'dist',
  tmp: '.tmp'
}

//
gulp.task('watch', ()=>
  gulp.watch([
    path.app + '/scss/**/*.scss'
  ], ['test'])
)

// 清除目标文件
gulp.task('clean', () =>
  del([path.dist, path.tmp])
);

// SCSS
gulp.task('scss', () =>
  gulp.src(path.app + '/scss/' + pkg.name + '.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.tmp))
);

// Static server
gulp.task('bs', () =>
  browserSync.init({
    port: 9000,
    server: {baseDir: ["app", ".tmp"]}
  })
);

// =====================================================================================================================

// Serve
gulp.task('default', gulp.series('clean', gulp.parallel('scss')));
