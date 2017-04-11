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
var buildFont = require('./tasks/gulp-build-font');

gulp.task('create-font', () => {
	return gulp.src('./assets/icons/*.svg')
		.pipe(buildFont())
		.pipe(source('icon.scss'))
		.pipe(gulp.dest('./public/fonts/'))
})

gulp.task('build-scss', ['copy-fonts'], () => {
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

gulp.task('build-hbs', () => {
	gulp.src('./front/components/ux-*/ux-*.hbs')
		.pipe(buildTemplates())
		.pipe(source('templates.js'))
		.pipe(gulp.dest('./tmp/'))
});

gulp.task('build-js', () => {
	gulp.src('./front/components/ux-*/ux-*.js')
		.pipe(buildComponents())
		.pipe(source('components.js'))
		.pipe(gulp.dest('./tmp/'))
})

gulp.task('bundle', ['build-hbs', 'build-js'], () => {
	browserify('./front/core.js').bundle()
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
		'./front/scss/**/*.scss',
		'./front/components/ux-*/ux-*.scss'
	]

	gulp.watch(files, ['build-scss']);
});

gulp.task('watch-hbs', () => {
	var files = [
		'./front/components/ux-*/ux-*.hbs'
	]

	gulp.watch(files, ['minify']);
})

gulp.task('watch-js', () => {
	var files = [
		'./front/components/ux-*/ux-*.js'
	]

	gulp.watch(files, ['minify']);
})

gulp.task('watch', [
	'watch-scss',
	'watch-hbs',
	'watch-js'
])

gulp.task('create', function () {
	var i = process.argv.indexOf('--component');
	if (i < 0) i = process.argv.indexOf('-c');
	var n_comp_name = process.argv[i + 1];

	if (i >= 0 && n_comp_name) {
		require('./tasks/gulp-create-comp')(n_comp_name);
	}
})

gulp.task('default', ['build-scss', 'bundle']);