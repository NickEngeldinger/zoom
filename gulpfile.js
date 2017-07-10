var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');

var del = require('del');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
	return gulp.src([
			'scss/main.scss', 
			'scss/header.scss', 
			'scss/list-item.scss', 
			'scss/icons.scss'
		])
		.pipe(sass())
		.pipe(concat('compiled-sass.css'))
		.pipe(cleanCSS())
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('public/css/'))
});

gulp.task('cleanup', function() {
	return del('scss/compiled-sass.css')
});

gulp.task('build-css', function() {
	runSequence('sass', 'cleanup')
});
 
gulp.task('build-js', function() {
	return gulp.src([
		'app/modules/zoom-events.js', 
		'app/controllers/events-list.js',
		'app/filters/trusted-html.js',
		'app/filters/time-format.js',
		'app/filters/date-suffix.js',
	])
		.pipe(concat('app.js'))
		.pipe(strip())
		.pipe(gulp.dest('public/js/'))
});

gulp.task('watch', function() {
	gulp.watch('scss/*.scss', ['build-css']);
	gulp.watch('app/**/*.js', ['build-js']);
});