"use strict";
var del = require('del'),
    gulp = require('gulp'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    nunjucksRender = require('gulp-nunjucks-render'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),

    input = {
        'sass': [
            'app/assets/sass/main.scss'
        ],
        'javascript': [
            'app/assets/js/jquery.min.js',
            'app/assets/js/jquery.dropotron.min.js',
            'app/assets/js/skel.min.js',
            'app/assets/js/util.js',
            'app/assets/js/main.js'
        ],
        'images': 'app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)',
        'fonts': 'app/assets/fonts/**/*',
        'fontawesome': 'app/assets/css/font-awesome.min.css',
        'pages': 'app/pages/*.html',
        'templates': 'app/templates/'
    },

    output = {
        'pages': 'dist',
        'images': 'dist/assets/images',
        'javascript': 'dist/assets/js',
        'stylesheets': 'dist/assets/css',
        'fonts': 'dist/assets/fonts',
        'html': 'dist/*.html'
    },

    clean = 'dist';

// Run the watch task when gulp is called without arguments
gulp.task('default', ['build', 'watch', 'browser-sync']);

// Clean the build directory
gulp.task('clean', function() {
    return del([clean]);
});

// Build assets
gulp.task('build', ['clean', 'images', 'sass', 'js', 'pages', 'fonts', 'fontawesome']);

// Compile SCSS files
gulp.task('sass', function() {
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
gulp.task('js', function() {
    return gulp.src(input.javascript)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.javascript));
});

gulp.task('images', function() {
    return gulp.src(input.images)
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest(output.images))
});

// Use nunjucks templating engine
gulp.task('pages', function() {
    return gulp.src(input.pages)
        .pipe(nunjucksRender({
            path: [input.templates]
        }))
        .pipe(gulp.dest(output.pages));
});

// Copy fonts to production folder
gulp.task('fonts', function() {
    return gulp.src(input.fonts)
        .pipe(gulp.dest(output.fonts));
});

// Copy fonts to production folder
gulp.task('fontawesome', function() {
    return gulp.src(input.fontawesome)
        .pipe(gulp.dest(output.stylesheets));
});

// Refresh the browser when changes are made to the watch files
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        },
        files: [output.html, output.stylesheets, output.javascript]
    });
});

// Watch these files for changes and run the task on update
gulp.task('watch', function() {
    gulp.watch(input.images, ['images']);
    gulp.watch(input.sass, ['sass']);
    gulp.watch(input.javascript, ['js']);
    gulp.watch(input.pages, ['pages']);
});
