/**
 * A module that exports a gulp copy function and related constant variables
 *
 * @module copy
 * @type {function}
 *
 * @author absolutholz
 * @version 1.0.0
 *
 * @example
 * const copy = require('./gulpfiles/copy');
 * gulp.task('your-copy-task-name', () => copy(['./test-source-directory/*'], './test-destination-directory));
 */

const { gulp, prettyError } = require('./common-packages');

/**
 * Default gulp.src options
 */
const SRC_OPTIONS = {};

/**
 * Default gulp.dest options
 */
const DEST_OPTIONS = {};

/**
 * Copy files and/or directories
 *
 * @param {string|Array} sourceFiles - Glob path(s) of files and/or directories to be copied
 * @param {string} destinationDirectory - Single path of destination directory
 * @param {Object} [srcOptions = SRC_OPTIONS] - [Gulp Documentation: gulp.src](https://gulpjs.org/API.html#gulp-src-globs-options)
 * @param {Object} [destOptions = DEST_OPTIONS] - [Gulp Documentation: gulp.src](https://gulpjs.org/API.html#gulp-dest-path-options)
 *
 * @property {string} description - Desciption of the function
 * @property {Object} defaults
 * @property {Object} [defaults.SRC_OPTIONS = SRC_OPTIONS]
 * @property {Object} [defaults.DEST_OPTIONS = DEST_OPTIONS]
 *
 * @returns TODO: gulp something
 */
function copy(sourceFiles, destinationDirectory, srcOptions = SRC_OPTIONS, destOptions = DEST_OPTIONS) {
	return gulp.src(sourceFiles, srcOptions) // gulp 4 sourcemaps: https://fettblog.eu/gulp-4-sourcemaps/
		.pipe(prettyError())
		.pipe(gulp.dest(destinationDirectory, destOptions));
}
copy.description = 'Copy files and/or directories';
copy.defaults = {
	SRC_OPTIONS,
	DEST_OPTIONS,
};

module.exports = copy;
