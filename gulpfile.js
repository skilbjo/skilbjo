var gulp 						= require('gulp')
	, jshint 					= require('gulp-jshint')
	, stylish 			 	= require('jshint-stylish');

gulp.task('default', function() {
 
});

gulp.task('lint', function() {
	return gulp.src(['server.js'
		, 'app/**/**/*.js'
    , 'test/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});