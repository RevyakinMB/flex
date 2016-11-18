const gulp = require('gulp'),
	browserSync = require('browser-sync');

module.exports = function(options) {
	return function() {
		browserSync.init({
			server: './'
		});
		gulp.watch('*.html').on('change', browserSync.reload);
		gulp.watch('dist/js/*.js').on('change', browserSync.reload);
	};
};
