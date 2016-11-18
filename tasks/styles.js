const gulp = require('gulp'),
	  $ = require('gulp-load-plugins')(),
	  browserSync = require('browser-sync'),
	  _if = require('gulp-if');

const env = process.env.NODE_ENV || 'development',
	production = env === 'production';

module.exports = function(options) {
	return function() {
	    return gulp.src(options.src)
			.pipe(gulp.dest(options.dest.less))
			.pipe(_if(!production, $.plumber({
				errorHandler: $.notify.onError(function(err) {
					console.log(err);
					return {
						title: 'Styles',
						message: err.message
					};
				})
			})))
			.pipe(_if(!production, $.sourcemaps.init()))
			.pipe($.less())
			.pipe(_if(!production, $.sourcemaps.write()))
			.pipe(gulp.dest(options.dest.css))
			.pipe(browserSync.stream())
			.pipe($.cleanCss())
			.pipe($.rename({ extname: '.min.css' }))
			.pipe(gulp.dest(options.dest.css));
	}
};
