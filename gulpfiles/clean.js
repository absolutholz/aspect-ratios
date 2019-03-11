/**
 * A module that exports a gulp clean function and related constant variables
 *
 * https://www.npmjs.com/package/del
 *
 * @module clean
 * @type {function}
 *
 * @author absolutholz
 * @version 1.0.0
 *
 * @example
 * const clean = require('./gulpfiles/clean');
 * gulp.task('your-clean-task-name', () => copy(['./test-directory']));
 */

const del = require('del'); // https://www.npmjs.com/package/del

/**
 * Default npm del options
 *
 * @private
 */
const DEL_OPTIONS = {};

/**
 * Clean a directory by deleting it
 *
 * @param {string|Array} directoryToDelete - Glob path(s) of files and/or directories to be copied
 * @param {Object} [delOptions = DEL_OPTIONS] - [npm del Documentation](https://www.npmjs.com/package/del)
 *
 * @property {string} description - Desciption of the function
 * @property {Object} defaults
 * @property {Object} [defaults.DEL_OPTIONS = DEL_OPTIONS]
 *
 * @returns TODO: gulp something
 */
function clean(directoryToDelete, delOptions = DEL_OPTIONS) {
	return del(directoryToDelete, delOptions);
}
clean.description = 'Clean a directory by deleting it';
clean.defaults = {
	DEL_OPTIONS,
};

module.exports = clean;
