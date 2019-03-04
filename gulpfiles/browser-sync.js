const { gulp } = require('./common-packages');

/**
 * Server wrapper for syncing browser and device interaction. Additionally reloads the browser on file change.
 *
 * The browser options, used to open windows on starting the task, are user system dependent and can/will vary between
 * different machines. A list of common installations that work on my windows 10 machine are as follows:
 * 'google chrome', 'chrome', 'firefox', 'vivaldi', 'opera', 'iexplore'
 *
 * https://www.browsersync.io/docs/gulp/
 * https://www.browsersync.io/docs/options/
 */

const browserSync = require('browser-sync').create();

const BROWSERSYNC_OPTIONS = {
	open: false,
	server: './build',
	watch: true,
};

function serve (browserSyncOptions = BROWSERSYNC_OPTIONS) {
	return browserSync.init(browserSyncOptions);
};
serve.description = 'Start simple Browsersync server';
serve.defaults = {
	BROWSERSYNC_OPTIONS
};

module.exports = serve;
