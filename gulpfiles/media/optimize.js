const imagemin = require('gulp-imagemin');

const { gulp, notify, size } = require('../common-packages');

const IMAGEMIN_OPTIONS = {
	verbose: true,
};

function optimize(sourceFiles, destinationDirectory, imageminOptions = IMAGEMIN_OPTIONS) {
	return gulp.src(sourceFiles)

		.pipe(imagemin(imageminOptions))

		.pipe(size({ showFiles: true, title: 'Media Optimized --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory))
		.pipe(notify({ message: 'Media optimized', onLast: true }));
}
optimize.description = 'Optimize Media files';
optimize.defaults = {
	IMAGEMIN_OPTIONS,
};

module.exports = optimize;
