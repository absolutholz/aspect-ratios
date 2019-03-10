/**
 * A module that exports a browser-sync server function and related constant variables
 *
 * https://www.browsersync.io/docs/gulp/
 *
 * @module BrowserSync
 * @type {function}
 *
 * @author absolutholz
 * @version 1.0.0
 *
 * @example
 * const browserSync = require('./gulpfiles/browser-sync');
 * gulp.task('your-browser-sync-task-name', () => browserSync(Object.assign({}, browserSync.defaults.BROWSERSYNC_OPTIONS, {
 * 	server: './docs',
 * 	watch: false, // EPERM: operation not permitted
 * })));
 */

const browserSync = require('browser-sync').create();

/**
 * Default browsersync options
 */
const BROWSERSYNC_OPTIONS = {
	open: false,
	server: './build',
	watch: true,
};

/**
 * Server wrapper for syncing browser and device interaction. Additionally reloads the browser on file change.
 *
 * The browser options, used to open windows on starting the task, are user system dependent and can/will vary between
 * different machines. A list of common installations that work on my windows 10 machine are as follows:
 * 'google chrome', 'chrome', 'firefox', 'vivaldi', 'opera', 'iexplore'
 *
 * @param {Object} [browserSyncOptions = BROWSERSYNC_OPTIONS] - [BrowserSync Options Documentation](https://www.browsersync.io/docs/options/)
 *
 * @property {string} description - Desciption of the function
 * @property {Object} defaults
 * @property {Object} [defaults.BROWSERSYNC_OPTIONS = BROWSERSYNC_OPTIONS]
 *
 * @returns TODO: gulp something
 */
function serve(browserSyncOptions = BROWSERSYNC_OPTIONS) {
	return browserSync.init(browserSyncOptions);
}
serve.description = 'Start simple Browsersync server';
serve.defaults = {
	BROWSERSYNC_OPTIONS,
};

module.exports = serve;
