const sassLint = require('gulp-sass-lint'); // https://www.npmjs.com/package/gulp-sass-lint

const { gulp } = require('../common-packages');

function lint(sourceFiles) {
	return gulp.src(sourceFiles)
		.pipe(sassLint())
		.pipe(sassLint.format());
}
lint.description = 'Lint SCSS files';
lint.defaults = {};

module.exports = lint;
