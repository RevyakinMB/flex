"use strict"

const gulp = require('gulp');

const gulpTask = function(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;

	gulp.task(taskName, function(callback) {
		var task = require(path).call(this, options);
		return task(callback);
	});
}

gulpTask('lint:less', './tasks/lint-less.js', {
	src: 'src/less/*.less'
});

gulpTask('styles', './tasks/styles.js', {
	src: 'src/less/*.less',
	dest: {
		less: 'dist/less',
		css: 'dist/css'
	}
});

gulpTask('clean', './tasks/clean.js', {
	dir: 'dist'
});

gulp.task('watch', function() {
	gulp.watch('src/less/*.less', gulp.series('styles'));
});

gulpTask('sync', './tasks/sync.js', {
	proxy: '127.0.0.1:8080/holy-grail'
});

gulp.task('build', gulp.series('clean', 'styles'));

gulp.task('default', gulp.series(
	'build',
	gulp.parallel('watch', 'sync'))
);

