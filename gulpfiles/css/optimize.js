const cssnano = require('cssnano'); // https://www.npmjs.com/package/cssnano
const postcss = require('gulp-postcss'); // https://github.com/postcss/gulp-postcss

/* eslint-disable-next-line object-curly-newline */
const { gulp, newer, notify, rename, sourcemaps, size } = require('../common-packages');

const CSSNANO_OPTIONS = {
	reduceIdents: false,
	minifyFontValues: false,
	discardComments: true,
	colormin: {},
};

function optimize(sourceFiles, destinationDirectory, cssnanoOptions = CSSNANO_OPTIONS) {
	return gulp.src(sourceFiles)
		.pipe(newer({
			dest: destinationDirectory,
			ext: '.min.css',
			extra: sourceFiles,
		}))

		.pipe(sourcemaps.init())

		.pipe(postcss([
			cssnano(cssnanoOptions),
		]))
		.pipe(rename({
			suffix: '.min',
		}))

		.pipe(sourcemaps.write('/'))

		.pipe(size({ showFiles: true, title: 'CSS Optimized --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory))
		.pipe(notify({ message: 'CSS optimization complete', onLast: true }));
}
optimize.description = 'Minimize CSS';
optimize.defaults = {
	CSSNANO_OPTIONS,
};

module.exports = optimize;
