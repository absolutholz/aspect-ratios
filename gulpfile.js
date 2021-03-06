/* ------------------------------------------------------------------------------------------------------------------------ *\
	General Setup
\* ------------------------------------------------------------------------------------------------------------------------ */

const DIR_SOURCE = './source';
const DIR_DEVELOPMENT = './build';
const DIR_PRODUCTION = './build';

const { gulp } = require('./gulpfiles/common-packages');
const clean = require('./gulpfiles/clean');
const copy = require('./gulpfiles/copy');
require('./gulpfiles/src-with-error-handling');

/* ------------------------------------------------------------------------------------------------------------------------ *\
   CSS Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const css = require('./gulpfiles/css/all');

const FILES_SOURCE_CSS = [`${DIR_SOURCE}/scss/**/*.scss`, `${DIR_SOURCE}/patterns/**/*.scss`];
const DIR_DEVELOPMENT_CSS = `${DIR_DEVELOPMENT}/css`;
const FILES_DEVELOPMENT_CSS = `${DIR_DEVELOPMENT_CSS}/**/*.css`;
const DIR_PRODUCTION_CSS = `${DIR_PRODUCTION}/css`;
const FILES_PRODUCTION_CSS = [FILES_DEVELOPMENT_CSS, `!${DIR_DEVELOPMENT_CSS}/**/*.min.css`];
const DIR_DOCUMENTATION_CSS = './docs/css';

gulp.task('fet:css:qa', () => css.lint(FILES_SOURCE_CSS));

gulp.task('fet:css:development', () => css.compile(FILES_SOURCE_CSS, DIR_DEVELOPMENT_CSS));
gulp.task('fet:css:development:clean', () => clean(DIR_DEVELOPMENT_CSS));

gulp.task('fet:css:production', () => css.optimize(FILES_PRODUCTION_CSS, DIR_PRODUCTION_CSS));
gulp.task('fet:css:production:clean', () => clean(DIR_PRODUCTION_CSS));

gulp.task('fet:css:documentation', () => css.document(FILES_SOURCE_CSS, Object.assign({}, css.document.defaults.SASSDOC_OPTIONS, { dest: DIR_DOCUMENTATION_CSS })));
gulp.task('fet:css:documentation:clean', () => clean(DIR_DOCUMENTATION_CSS));

gulp.task('fet:css', gulp.parallel('fet:css:qa', gulp.series('fet:css:documentation:clean', 'fet:css:documentation'), gulp.series(gulp.parallel('fet:css:development:clean', 'fet:css:production:clean'), 'fet:css:development', 'fet:css:production')));

/* ------------------------------------------------------------------------------------------------------------------------ *\
   JavaScript Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const js = require('./gulpfiles/js/all');

const FILES_SOURCE_JS = [`${DIR_SOURCE}/js/**/*.js`, `${DIR_SOURCE}/patterns/**/*.js`];
const DIR_DEVELOPMENT_JS = `${DIR_DEVELOPMENT}/js`;
const FILES_DEVELOPMENT_JS = `${DIR_DEVELOPMENT_JS}/**/*.js`;
const DIR_PRODUCTION_JS = `${DIR_PRODUCTION}/js`;
const FILES_PRODUCTION_JS = [FILES_DEVELOPMENT_JS, `!${DIR_DEVELOPMENT_JS}/**/*.min.js`];
const DIR_DOCUMENTATION_JS = './docs/js';

gulp.task('fet:js:qa', () => js.lint(FILES_SOURCE_JS));

gulp.task('fet:js:development', () => js.transpile(FILES_SOURCE_JS, DIR_DEVELOPMENT_JS));
gulp.task('fet:js:development:clean', () => clean(DIR_DEVELOPMENT_JS));

gulp.task('fet:js:production', () => js.optimize(FILES_PRODUCTION_JS, DIR_PRODUCTION_JS));
gulp.task('fet:js:production:clean', () => clean(DIR_PRODUCTION_JS));

gulp.task('fet:js:documentation', () => js.document(FILES_SOURCE_JS, Object.assign({}, js.document.defaults.JSDOC_OPTIONS, { destination: DIR_DOCUMENTATION_JS })));
gulp.task('fet:js:documentation:clean', () => clean(DIR_DOCUMENTATION_JS));

gulp.task('fet:js', gulp.parallel('fet:js:qa', gulp.series('fet:js:documentation:clean', 'fet:js:documentation'), gulp.series(gulp.parallel('fet:js:development:clean', 'fet:js:production:clean'), 'fet:js:development', 'fet:js:production')));

/* ------------------------------------------------------------------------------------------------------------------------ *\
   SVG Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const svg = require('./gulpfiles/svg/all');

const FILES_SOURCE_SVG_ICONS = `${DIR_SOURCE}/icons/**/*.svg`;
const DIR_DEVELOPMENT_SVG_ICONS = `${DIR_DEVELOPMENT}/icons`;
const FILES_DEVELOPMENT_SVG_ICONS = `${DIR_DEVELOPMENT_SVG_ICONS}/**/*.svg`;
const DIR_PRODUCTION_SVG_ICONS = `${DIR_PRODUCTION}/icons`;

// const sIconNames = require(`../../${SOURCE_DIR_NAME}/${PATTERNS_DIR_NAME}/02-simple/00-atoms/iconography/external-sprite/external-sprite-selected-icons.json`).toString();
// `${ICONS_BUILD_DIR}/{${sIconNames}}.svg`

gulp.task('fet:svg:development', () => svg.sprite(FILES_SOURCE_SVG_ICONS, DIR_DEVELOPMENT_SVG_ICONS));
gulp.task('fet:svg:production', () => copy(FILES_DEVELOPMENT_SVG_ICONS, DIR_PRODUCTION_SVG_ICONS));

/* ------------------------------------------------------------------------------------------------------------------------ *\
   Media Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

const media = require('./gulpfiles/media/all');

const FILES_SOURCE_MEDIA = `${DIR_SOURCE}/icons/**/*.{svg,png,jpg,jpeg,gif}`;
const DIR_DEVELOPMENT_MEDIA = `${DIR_DEVELOPMENT}/media`;
const FILES_DEVELOPMENT_MEDIA = `${DIR_DEVELOPMENT_MEDIA}/**/*`;
const DIR_PRODUCTION_MEDIA = `${DIR_PRODUCTION}/media`;

gulp.task('fet:media:development:clean', () => clean(DIR_DEVELOPMENT_MEDIA));
gulp.task('fet:media:development:optimize', () => media.optimize(FILES_SOURCE_MEDIA, DIR_DEVELOPMENT_MEDIA));
gulp.task('fet:media:development:webp', () => media.webp(FILES_SOURCE_MEDIA, DIR_DEVELOPMENT_MEDIA));
gulp.task('fet:media:development', gulp.series('fet:media:development:clean', gulp.parallel('fet:media:development:optimize', 'fet:media:development:webp')));
gulp.task('fet:media:production', () => copy(FILES_DEVELOPMENT_MEDIA, DIR_PRODUCTION_MEDIA));

/* ------------------------------------------------------------------------------------------------------------------------ *\
   File Watchers
\* ------------------------------------------------------------------------------------------------------------------------ */

gulp.task('fet:watch', (done) => {
	gulp.watch(FILES_SOURCE_CSS, gulp.series('fet:css:development', 'fet:css:documentation'));
	gulp.watch(FILES_SOURCE_JS, gulp.series('fet:js:development', 'fet:js:documentation'));
	done();
});

/* ------------------------------------------------------------------------------------------------------------------------ *\
   Utility Tasks
\* ------------------------------------------------------------------------------------------------------------------------ */

gulp.task('fet:gulp:documentation', cb => js.document('./gulpfiles/**/*.js', Object.assign({}, js.document.defaults.JSDOC_OPTIONS, { destination: './docs/gulp' }), cb));
gulp.task('fet:gulp:documentation:clean', () => clean('./docs/gulp'));

gulp.task('fet:documentation', gulp.parallel('fet:gulp:documentation', 'fet:css:documentation', 'fet:js:documentation'));

const browserSync = require('./gulpfiles/browser-sync');

gulp.task('fet:browser-sync', () => browserSync(Object.assign({}, browserSync.defaults.BROWSERSYNC_OPTIONS, {
	server: './docs',
	watch: false, // EPERM: operation not permitted
})));

gulp.task('fet', gulp.parallel('fet:css', 'fet:js'));

gulp.task('fet:develop', gulp.series('fet', gulp.parallel('fet:browser-sync', 'fet:watch')));

// module.exports = {
// 	css,
// 	js,
// 	clean,
// };
