const uglify = require('gulp-uglify-es').default; // https://www.npmjs.com/package/gulp-uglify-es

/* eslint-disable-next-line object-curly-newline */
const { gulp, prettyError, rename, sourcemaps, size } = require('../common-packages');

function optimize(sourceFiles, destinationDirectory) {
	return gulp.src(sourceFiles)
		.pipe(prettyError())

		.pipe(sourcemaps.init())

		.pipe(uglify())

		.pipe(sourcemaps.write('/'))
		.pipe(rename({
			suffix: '.min',
		}))

		.pipe(size({ showFiles: true, title: 'JS Optimized --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory));
}
optimize.description = 'Minimize JS';
optimize.defaults = {};

module.exports = optimize;
