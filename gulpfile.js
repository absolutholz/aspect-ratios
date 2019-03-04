/* ---------------------------------------- *\
General Setup
\* ---------------------------------------- */

const gulp = require('gulp');

const DIR_SOURCE = './source';
const DIR_DEVELOPMENT = './build';
const DIR_PRODUCTION = './build';

/* ---------------------------------------- *\
   CSS Tasks
\* ---------------------------------------- */

const css = require('./gulpfiles/css/all');
const browserSync = require('./gulpfiles/browser-sync');

const FILES_SOURCE_CSS = [`${DIR_SOURCE}/scss/**/*.scss`, `${DIR_SOURCE}/patterns/**/*.scss`];
const DIR_DEVELOPMENT_CSS = `${DIR_DEVELOPMENT}/css`;
const FILES_DEVELOPMENT_CSS = `${DIR_DEVELOPMENT_CSS}/**/*.css`;
const DIR_PRODUCTION_CSS = `${DIR_PRODUCTION}/css`;
const FILES_PRODUCTION_CSS = [FILES_DEVELOPMENT_CSS, `!${DIR_DEVELOPMENT_CSS}/**/*.min.css`];

gulp.task('aspect-ratios:css:qa', () => css.lint(FILES_SOURCE_CSS));

gulp.task('aspect-ratios:css:development', () => css.compile(FILES_SOURCE_CSS, DIR_DEVELOPMENT_CSS));

gulp.task('aspect-ratios:css:production', () => css.optimize(FILES_PRODUCTION_CSS, DIR_PRODUCTION_CSS));

gulp.task('aspect-ratios:css:documentation', () => css.document(FILES_SOURCE_CSS));

gulp.task('aspect-ratios:css', gulp.parallel('aspect-ratios:css:qa', gulp.parallel('aspect-ratios:css:documentation', gulp.series('aspect-ratios:css:development', 'aspect-ratios:css:production'))));

/* ---------------------------------------- *\
   File Watchers
\* ---------------------------------------- */

gulp.task('aspect-ratios:watch', (done) => {
	gulp.watch(FILES_SOURCE_CSS, gulp.series('aspect-ratios:css:development'));
	gulp.watch(FILES_PRODUCTION_CSS, gulp.series('aspect-ratios:css:documentation'));
	done();
});

/* ---------------------------------------- *\
   Utility Tasks
\* ---------------------------------------- */

gulp.task('aspect-ratios:browser-sync', () => browserSync(Object.assign({}, browserSync.defaults.BROWSERSYNC_OPTIONS, {
	server: './docs',
	watch: false, // EPERM: operation not permitted
})));

gulp.task('aspect-ratios:develop', gulp.parallel('aspect-ratios:browser-sync', 'aspect-ratios:watch'));

gulp.task('aspect-ratios', gulp.series('aspect-ratios:css'));

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
