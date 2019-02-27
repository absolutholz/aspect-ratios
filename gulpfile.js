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

const FILES_SOURCE_CSS = [`${DIR_SOURCE}/scss/**/*.scss`, `${DIR_SOURCE}/patterns/**/*.scss`];
const DIR_DEVELOPMENT_CSS = `${DIR_DEVELOPMENT}/css`;
const FILES_DEVELOPMENT_CSS = `${DIR_DEVELOPMENT_CSS}/**/*.css`;
const DIR_PRODUCTION_CSS = `${DIR_PRODUCTION}/css`;

gulp.task('aspect-ratios:css:qa', () => css.lint(FILES_SOURCE_CSS));

gulp.task('aspect-ratios:css:development', () => css.compile(FILES_SOURCE_CSS, DIR_DEVELOPMENT_CSS));

gulp.task('aspect-ratios:css:production', () => css.optimize(FILES_DEVELOPMENT_CSS, DIR_PRODUCTION_CSS));

gulp.task('aspect-ratios:css', gulp.parallel('aspect-ratios:css:qa', gulp.series('aspect-ratios:css:development', 'aspect-ratios:css:production')));

/* ---------------------------------------- *\
   File Watchers
\* ---------------------------------------- */

gulp.task('aspect-ratios:watch', (done) => {
	gulp.watch(FILES_SOURCE_CSS, gulp.series('aspect-ratios:css:development'));
	done();
});

/* ---------------------------------------- *\
   Utility Tasks
\* ---------------------------------------- */

gulp.task('aspect-ratios', gulp.series('aspect-ratios:css'));
