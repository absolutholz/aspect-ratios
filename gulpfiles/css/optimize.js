const packages = require('../common-packages');
const gulp = packages.gulp;

const cssnano = require('cssnano'); // https://www.npmjs.com/package/cssnano
const postcss = require('gulp-postcss'); // https://github.com/postcss/gulp-postcss
const rename = require('gulp-rename'); // https://www.npmjs.com/package/gulp-rename

const CSSNANO_OPTIONS = {
	reduceIdents: false,
	minifyFontValues: false,
	discardComments: true,
	colormin: {},
};

function optimize (sourceFiles, destinationDirectory, cssnanoOptions = CSSNANO_OPTIONS) {
	return gulp.src(sourceFiles)
		.pipe(packages.prettyError())

		.pipe(packages.newer({
			dest: destinationDirectory,
			ext: '.min.css',
			extra: sourceFiles,
		}))

		.pipe(packages.sourcemaps.init())

		.pipe(postcss([
			cssnano(cssnanoOptions),
		]))
		.pipe(rename({
            suffix: '.min'
        }))

		.pipe(packages.sourcemaps.write('/'))

		.pipe(packages.size({ showFiles: true, title: 'CSS Optimized --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory));
};
optimize.description = 'Minimize CSS';
optimize.defaults = {
	CSSNANO_OPTIONS,
};

module.exports = optimize;
