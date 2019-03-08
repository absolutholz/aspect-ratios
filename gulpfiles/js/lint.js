const eslint = require('gulp-eslint'); // https://www.npmjs.com/package/gulp-eslint

const { gulp } = require('../common-packages');

function lint(sourceFiles) {
	return gulp.src(sourceFiles)
		.pipe(eslint())
		.pipe(eslint.format());
}
lint.description = 'Lint ECMAScript files';
lint.defaults = {};

module.exports = lint;
