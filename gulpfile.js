var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');

var thru = require('through2');
var source = require('vinyl-source-stream');

//	build stuff
var scss = require('gulp-sass');
var browserify = require('browserify');

//	custom stuff
var buildTemplates = require('./tasks/gulp-build-templates');
var buildComponents = require('./tasks/gulp-build-components');

gulp.task('scss', () => {
	return gulp.src([
		'./front/scss/style.scss',
		'./front/components/ux-*/ux-*.scss'
	])
		.pipe(sourcemaps.init())
		.pipe(scss({
			includePaths: [
				'./front/scss/mixins/',
				'./front/components/ux-*/'
			]
		}))
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/css/'))
})

gulp.task('build-templates', () => {
	gulp.src('./front/components/ux-*/ux-*.hbs')
		.pipe(buildTemplates())
		.pipe(source('templates.js'))
		.pipe(gulp.dest('./tmp/'))
});

gulp.task('build-components', () => {
	gulp.src('./front/components/ux-*/ux-*.js')
		.pipe(buildComponents())
		.pipe(source('components.js'))
		.pipe(gulp.dest('./tmp/'))
})

gulp.task('bundle', ['build-templates', 'build-components'], () => {
	browserify('./tmp/components.js').bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./public/js/'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(concat('bundle.min.js'))		//	not sure why, but source() gets an error with non-string/buffer chunk. strange
		.pipe(gulp.dest('./public/js/'))
})

gulp.task('minify', ['bundle'], function () {
	gulp.src(['./public/js/bundle.js'])
		.pipe(uglify())
		.pipe(source('bundle.min.js'))
		.pipe(gulp.dest('./public/js/'))
})

gulp.task('watch-scss', () => {
	var files = [
		'./front/scss/*.scss',
		'./front/components/ux-*/ux-*.scss'
	];

	gulp.watch(files, 'scss');
});

gulp.task('default', ['bundle'])