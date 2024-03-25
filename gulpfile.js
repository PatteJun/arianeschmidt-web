const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename')
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');
const concat = require('gulp-concat');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.scss', {rebaseUrls: false}))
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(rename('main.css'))
        .pipe(gulp.dest('assets/css'));
});


gulp.task('scripts', () => {
    return browserify({
        entries: ['./src/scripts/app.js']
        })
        .transform(babelify.configure({
            presets: ['@babel/preset-env']
        }))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('assets/js'))
});


gulp.task('clean', (done) => {
    del([
        'assets/css/main.css',
        'assets/js/main.js'
    ]);
    done()
});

gulp.task('watch', () => {
    gulp.watch(('src'), (done) => {
        gulp.series(['clean', 'styles', 'scripts'])(done);
    });
});