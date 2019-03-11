const jsdoc = require('gulp-jsdoc3'); // https://www.npmjs.com/package/gulp-jsdoc3

const { gulp, prettyError } = require('../common-packages');

const JSDOC_OPTIONS = {
	destination: 'docs',
	encoding: 'utf8',
	private: true,
	recurse: true,
};

function document(sourceFiles, jsDocOptions = JSDOC_OPTIONS, callbackFunction = () => { }) {
	return gulp.src(sourceFiles)
		.pipe(prettyError())
		.pipe(jsdoc(
			{
				opts: jsDocOptions,
				plugins: [
					'plugins/markdown',
				],
			},
			callbackFunction,
		));
}
document.description = 'Create JSDoc documentation';
document.defaults = {
	JSDOC_OPTIONS,
};

module.exports = document;
