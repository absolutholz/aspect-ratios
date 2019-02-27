const packages = require('../common-packages');
const gulp = packages.gulp;

const sassLint = require('gulp-sass-lint'); // https://www.npmjs.com/package/gulp-sass-lint

function lint(sourceFiles) {
	return gulp.src(sourceFiles)
		.pipe(sassLint())
		.pipe(sassLint.format());
}
lint.description = 'Lint SCSS files';
lint.defaults = {};

module.exports = lint;
