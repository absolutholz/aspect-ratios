/* eslint-disable global-require */
module.exports = {
	gulp: require('gulp'),
	del: require('del'),
	newer: require('gulp-newer'), // https://www.npmjs.com/package/gulp-newer
	notify: require('gulp-notify'), // https://www.npmjs.com/package/gulp-notify
	plumber: require('gulp-plumber'), // https://www.npmjs.com/package/gulp-plumber
	// may be worth looking into using pump https://www.npmjs.com/package/pump https://gulpjs.org/why-use-pump/
	prettyError: require('gulp-prettyerror'), // https://andidittrich.de/2016/03/prevent-errors-from-breaking-gulp-watch.html
	rename: require('gulp-rename'), // https://www.npmjs.com/package/gulp-rename
	size: require('gulp-size'), // https://www.npmjs.com/package/gulp-size
	sourcemaps: require('gulp-sourcemaps'), // https://www.npmjs.com/package/gulp-sourcemaps
};
