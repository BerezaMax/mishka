let preprocessor = 'scss';
const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'app/' },
    notify: false,
    online: true,
  });
}

function styles() {
  return src('app/' + preprocessor + '/main.' + preprocessor + '')
    .pipe(sourcemaps.init())
    .pipe(eval(sass)())
    .pipe(
      autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream());
}

function startwatch() {
  watch('app/**/' + preprocessor + '/**/*', styles);
  watch('app/**/*.html').on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.default = parallel(styles, browsersync, startwatch);
