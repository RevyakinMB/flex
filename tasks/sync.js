const gulp = require('gulp'),
	browserSync = require('browser-sync');

module.exports = function(options) {
	return function() {
		browserSync.init({
			server: './'
		});
		gulp.watch('index.html').on('change', browserSync.reload);
	};
};
