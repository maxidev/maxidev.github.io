var path = "..";
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");
var notify = require("gulp-notify");
var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
    gulp.src(['./index.html'])
        .pipe(fileinclude({
        prefix: '@@',
        basepath: '..'
        }))
        .pipe(gulp.dest('..'));

    gulp.src(['./industries.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '..'
        }))
    .pipe(gulp.dest('..'));

    gulp.src(['./partners.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '..'
        }))
    .pipe(gulp.dest('..'));

    gulp.src(['./about.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '..'
        }))
    .pipe(gulp.dest('..'));

    gulp.src(['./team.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '..'
        }))
    .pipe(gulp.dest('..'));

    gulp.src(['./contact.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '..'
        }))
    .pipe(gulp.dest('..'));

    gulp.src(['./services.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '..'
        }))
    .pipe(gulp.dest('..'));

    gulp.src(['./customers.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '..'
        }))
    .pipe(gulp.dest('..'));
});

gulp.task('serve', ['sass', 'fileinclude'], function() {

    browserSync.init({
        server: "..",
        notify: false,
        open: false
    });

    // gulp.watch(path + "/assets/scss/*.scss", ['sass']);
    gulp.watch(path + "/assets/scss/**/*.scss", ['sass']);
    gulp.watch(path + "/assets/js/vendors/*.js", ['concat']);
    gulp.watch(path + "/**/**/*.html", ['fileinclude']);
    gulp.watch(path + "/**/*.html", ['fileinclude']);
    gulp.watch(path + "/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src(path + "/assets/scss/*.scss")
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename("main.min.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path + "/assets/css/"))
        .pipe(browserSync.stream());
});

gulp.task('concat', function() {
    return gulp.src(path + "/assets/js/vendors/*.js")
        .pipe(concat("vendors.js"))
        .pipe(gulp.dest(path + "/assets/js/"));
});

gulp.task('default', ['serve']);
