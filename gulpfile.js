"use strict";
var del = require('del'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),

    input = {
        'sass': [
            'assets/sass/main.scss'
        ],
        'javascript': []
    },

    output = {
        'stylesheets': 'assets/css',
        'html': '*.html'
    };

// Run the watch task when gulp is called without arguments
gulp.task('default', ['clean', 'build', 'watch', 'browser-sync']);

// Clean the build directory
gulp.task('clean', function() {
    return del(['build']);
});

// Build assets
gulp.task('build', ['build-css']);

// Compile SCSS files
gulp.task('build-css', function() {
    return gulp.src(input.sass)
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'expanded',
            includePaths: input.sass
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.stylesheets));
});

// Concat JavaScript files
gulp.task('build-js', function() {
    return gulp.src(input.javascript)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});

// Refresh the browser when changes are made to the watch files
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        files: [output.html, output.stylesheets, output.javascript]
    });
});

// Watch these files for changes and run the task on update
gulp.task('watch', function() {
    gulp.watch(input.javascript, ['build-js']);
    gulp.watch(input.sass, ['build-css']);
});
