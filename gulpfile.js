const gulp      = require('gulp')
const concat    = require('gulp-concat')
const cssnano   = require('gulp-cssnano')
const plumber   = require('gulp-plumber')
const prefix    = require('gulp-autoprefixer')
const rename    = require('gulp-rename')
const sass      = require('gulp-sass')
const sourcemap = require('gulp-sourcemaps')
const swig      = require('gulp-swig')
const uglify    = require('gulp-uglify')
const bs        = require('browser-sync')
const runOrder  = require('run-sequence')
const trash     = require('trash')

// Customize your site in 'config' directory
const structure = require('./config/structure')
const swigOptions = require('./config/swig')
const reporter  = require('./config/reporter')
const server  = require('./config/server')

// Build index page by itself
gulp.task('index', () => {
  gulp.src(structure.src.index)
    .pipe(plumber(reporter.onError))
    .pipe(swig(swigOptions))
    .pipe(gulp.dest(structure.dest.dir))
    .pipe(bs.stream())
})

// 1. Get the page's basename
// 2. Make a new directory from the name
// 3. Rename the file to 'index.html'
// 4. Save 'basename/index.html' it in 'dest' dir
gulp.task('pages', () => {
  gulp.src(structure.src.pages)
    .pipe(plumber(reporter.onError))
    .pipe(swig(swigOptions))
    .pipe(rename(file => {
      file.dirname = require('path').join(file.dirname, file.basename)
      file.basename = 'index'
      file.extname = '.html'
    }))
    .pipe(gulp.dest(structure.dest.dir))
    .pipe(bs.stream())
})

// 1. Initialize sourcemaps
// 2. Compile SCSS
// 3. Add vendor prefixes
// 4. Rename to '*.min.css'
// 5. Minify the final CSS
gulp.task('scss', () => {
  gulp.src(structure.src.scss)
    .pipe(plumber(reporter.onError))
    .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(prefix('last 2 versions'))
      .pipe(rename({suffix: '.min'}))
      .pipe(cssnano())
    .pipe(sourcemap.write())
    .pipe(gulp.dest(structure.dest.css))
    .pipe(bs.stream())
})

// 1. Initialize sourcemaps
// 2. Concatenate files and rename
// 3. Minify the final JS
gulp.task('js', () => {
  gulp.src(structure.src.js)
    .pipe(plumber(reporter.onError))
    .pipe(sourcemap.init())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
    .pipe(sourcemap.write())
    .pipe(gulp.dest(structure.dest.js))
    .pipe(bs.stream())
})

// Copy all the images
gulp.task('img', () => {
  gulp.src(structure.src.img)
    .pipe(plumber(reporter.onError))
    .pipe(gulp.dest(structure.dest.img))
    .pipe(bs.stream())
})

// Copy all the files in /misc
gulp.task('misc', () => {
  gulp.src(structure.src.misc)
    .pipe(plumber(reporter.onError))
    .pipe(gulp.dest(structure.dest.misc))
    .pipe(bs.stream())
})

// Remove contents from build directory
gulp.task('clean', () => {
  trash([structure.dest.clean]).then(() => {
    console.log(`'${structure.dest.dir}' contents moved to trash.`);
  })
})

// Launch the dev server and watch for changes
gulp.task('serve', () => {
  gulp.watch(structure.src.scss, ['scss'])
  gulp.watch(structure.src.js, ['js'])
  gulp.watch(structure.src.img, ['img'])
  gulp.watch(structure.src.index, ['index'])
  gulp.watch(structure.src.pages, ['pages'])
  gulp.watch(structure.src.layouts, ['pages', 'index'])
  bs(server)
})

// default 'gulp' task
gulp.task('default', () => {
  runOrder('pages', 'index', 'scss', 'js', 'img', 'serve')
})
