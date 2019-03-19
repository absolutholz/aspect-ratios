const extReplace = require('gulp-ext-replace');
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');

const { gulp, notify, size } = require('../common-packages');

const IMAGEMIN_WEBP_OPTIONS = {
	quality: 100,
};

function webp(sourceFiles, destinationDirectory, imageminWebpOptions = IMAGEMIN_WEBP_OPTIONS) {
	return gulp.src(sourceFiles)

		.pipe(imagemin([
			imageminWebp(imageminWebpOptions),
		]))
		.pipe(extReplace('.webp'))

		.pipe(size({ showFiles: true, title: 'WEBP Image Created --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory))
		.pipe(notify({ message: 'WEBP Media created', onLast: true }));
}
webp.description = 'Create WEBP Media files from source files of other formats';
webp.defaults = {
	IMAGEMIN_WEBP_OPTIONS,
};

module.exports = webp;
