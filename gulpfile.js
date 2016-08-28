var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('less', function(){
    return gulp.src(['./less/main.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./www/css/styles.css'))
})

gulp.watch(['./less/**/*.less'], ['less']);