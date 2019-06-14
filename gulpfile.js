const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const minimist = require('minimist')

const envOptions = {
  string: 'env',
  default: { env: 'development' }
}
const options = minimist(process.argv.slice(2), envOptions)
gulp.task('browserSync', () => {
  browserSync.init({
    server: { baseDir: './public' },
    reloadDebounce: 2000
  })
})

gulp.task('html', () => {
  return gulp.src('./source/**/*.html')
    .pipe($.plumber())
    .pipe($.htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.sass')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      cascade: false
    }))
    .pipe($.if(options.env === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('babel', () => {
  return gulp.src('./source/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.concat('all.js'))
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.if(options.env === 'production', $.uglify({
      compress: {
        drop_console: true
      }
    })))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('imageMin', () => {
  return gulp.src('./source/image/**/*')
    .pipe($.if(options.env === 'prodoction', $.imagemin()))
    .pipe(gulp.dest('./public/image'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('watch-html', () => {
  return gulp.watch('./source/**/*.html', gulp.series('html'))
})
gulp.task('watch-sass', () => {
  return gulp.watch('./source/sass/**/*.sass', gulp.series('sass'))
})
gulp.task('watch-js', () => {
  return gulp.watch('./source/js/**/*.js', gulp.series('babel'))
})
gulp.task('watch-image', () => {
  return gulp.watch('./source/image/**/*', gulp.series('imageMin'))
})
gulp.task('watch', gulp.parallel('watch-html', 'watch-sass', 'watch-js', 'watch-image'))

gulp.task('clean', () => {
  return gulp.src('./public', { read: false })
    .pipe($.clean())
})

gulp.task('deploy', () => {
  return gulp.src('./public/**/*')
    .pipe($.ghPages());
})

gulp.task('build', gulp.series('clean', 'html', 'sass', 'babel', 'imageMin'))

gulp.task('default', gulp.parallel('browserSync', 'html', 'sass', 'babel', 'imageMin', 'watch'))
