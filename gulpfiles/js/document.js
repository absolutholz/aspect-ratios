const jsdoc = require('gulp-jsdoc3'); // https://www.npmjs.com/package/gulp-jsdoc3

const { gulp, notify } = require('../common-packages');

const JSDOC_OPTIONS = {
	destination: 'docs',
	encoding: 'utf8',
	private: true,
	recurse: true,
};

function document(sourceFiles, jsDocOptions = JSDOC_OPTIONS, callbackFunction = () => { }) {
	return gulp.src(sourceFiles)
		.pipe(jsdoc(
			{
				opts: jsDocOptions,
				plugins: [
					'plugins/markdown',
				],
			},
			callbackFunction,
		))
		.pipe(notify({ message: 'JS documentation complete', onLast: true }));
}
document.description = 'Create JSDoc documentation';
document.defaults = {
	JSDOC_OPTIONS,
};

module.exports = document;
