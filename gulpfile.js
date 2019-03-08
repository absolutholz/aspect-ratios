/* ------------------------------------------------------------------------------------------------------------------------ *\
General Setup
\* ------------------------------------------------------------------------------------------------------------------------ */

const gulp = require('gulp');

const DIR_SOURCE = './source';
const DIR_DEVELOPMENT = './build';
const DIR_PRODUCTION = './build';

/* ------------------------------------------------------------------------------------------------------------------------ *\
   CSS Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const css = require('./gulpfiles/css/all');

const FILES_SOURCE_CSS = [`${DIR_SOURCE}/scss/**/*.scss`, `${DIR_SOURCE}/patterns/**/*.scss`];
const DIR_DEVELOPMENT_CSS = `${DIR_DEVELOPMENT}/css`;
const FILES_DEVELOPMENT_CSS = `${DIR_DEVELOPMENT_CSS}/**/*.css`;
const DIR_PRODUCTION_CSS = `${DIR_PRODUCTION}/css`;
const FILES_PRODUCTION_CSS = [FILES_DEVELOPMENT_CSS, `!${DIR_DEVELOPMENT_CSS}/**/*.min.css`];

gulp.task('fet:css:qa', () => css.lint(FILES_SOURCE_CSS));

gulp.task('fet:css:development', () => css.compile(FILES_SOURCE_CSS, DIR_DEVELOPMENT_CSS));

gulp.task('fet:css:production', () => css.optimize(FILES_PRODUCTION_CSS, DIR_PRODUCTION_CSS));

gulp.task('fet:css:documentation', () => css.document(FILES_SOURCE_CSS));

gulp.task('fet:css', gulp.parallel('fet:css:qa', gulp.parallel('fet:css:documentation', gulp.series('fet:css:development', 'fet:css:production'))));

/* ------------------------------------------------------------------------------------------------------------------------ *\
   JS Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const js = require('./gulpfiles/js/all');

const FILES_SOURCE_JS = [`${DIR_SOURCE}/js/**/*.js`, `${DIR_SOURCE}/patterns/**/*.js`];
const DIR_DEVELOPMENT_JS = `${DIR_DEVELOPMENT}/js`;
const FILES_DEVELOPMENT_JS = `${DIR_DEVELOPMENT_JS}/**/*.js`;
const DIR_PRODUCTION_JS = `${DIR_PRODUCTION}/js`;
const FILES_PRODUCTION_JS = [FILES_DEVELOPMENT_JS, `!${DIR_DEVELOPMENT_JS}/**/*.min.js`];

gulp.task('fet:js:qa', () => js.lint(FILES_SOURCE_JS));

gulp.task('fet:js:development', () => js.transpile(FILES_SOURCE_JS, DIR_DEVELOPMENT_JS));

gulp.task('fet:js:production', () => js.optimize(FILES_PRODUCTION_JS, DIR_PRODUCTION_JS));

gulp.task('fet:js', gulp.parallel('fet:js:qa', gulp.series('fet:js:development', 'fet:js:production')));

/* ------------------------------------------------------------------------------------------------------------------------ *\
   File Watchers
\* ------------------------------------------------------------------------------------------------------------------------ */

gulp.task('fet:watch', (done) => {
	gulp.watch(FILES_SOURCE_CSS, gulp.series('fet:css:development', 'fet:css:documentation'));
	gulp.watch(FILES_SOURCE_JS, gulp.series('fet:js:development'));
	done();
});

/* ------------------------------------------------------------------------------------------------------------------------ *\
   Utility Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const browserSync = require('./gulpfiles/browser-sync');

gulp.task('fet:browser-sync', () => browserSync(Object.assign({}, browserSync.defaults.BROWSERSYNC_OPTIONS, {
	server: './docs',
	watch: false, // EPERM: operation not permitted
})));

gulp.task('fet', gulp.parallel('fet:css', 'fet:js'));

gulp.task('fet:develop', gulp.series('fet', gulp.parallel('fet:browser-sync', 'fet:watch')));

module.exports = {
	css,
	DIR_SOURCE,
	FILES_SOURCE_CSS,
	DIR_DEVELOPMENT,
	DIR_DEVELOPMENT_CSS,
	FILES_DEVELOPMENT_CSS,
	DIR_PRODUCTION,
	DIR_PRODUCTION_CSS,
	FILES_PRODUCTION_CSS,
};
