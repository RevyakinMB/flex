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

gulpTask('lint:js', './tasks/lint-js.js', {
    src: 'src/js/*.js',
	cacheFilePath: process.cwd() + '/tmp/lintCache.json',
	eslintrcPath: process.cwd() + '/.eslintrc.js'
});

gulp.task('lint', gulp.parallel('lint:js', 'lint:less'));

gulpTask('js', './tasks/js.js', {
	src: 'src/js/*.js',
	dest: 'dist/js'
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
	gulp.watch('src/js/*.js', gulp.series('js'));
});

gulpTask('sync', './tasks/sync.js', {});

gulp.task('build', gulp.series('clean',
	gulp.parallel('styles', 'js'))
);

gulp.task('default', gulp.series(
	'build',
	gulp.parallel('watch', 'sync'))
);

