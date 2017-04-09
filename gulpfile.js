var gulp = require('gulp');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', () => {
	return gulp.src(['./front/scss/style.scss'])
		.pipe(sourcemaps.init())
		.pipe(scss({
			includePaths: [
				'./front/components/ux-*/ux-*.scss'
			]
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/css/'))
})

gulp.task('watch-scss', () => {
	var files = [
		'./front/scss/*.scss',
		'./front/components/ux-*/ux-*.scss'
	];

	gulp.watch(files, 'scss');
});