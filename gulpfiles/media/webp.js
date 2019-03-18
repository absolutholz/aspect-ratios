const extReplace = require('gulp-ext-replace');
const imagemin = require('gulp-imagemin');
const webp = require('imagemin-webp');

const { gulp, notify, size } = require('../common-packages');

const IMAGEMIN_WEBP_OPTIONS = {
	quality: 100,
};

function wepb(sourceFiles, destinationDirectory, imageminWebpOptions = IMAGEMIN_WEBP_OPTIONS) {
	gulp.src(sourceFiles)

		.pipe(imagemin([
			webp(imageminWebpOptions),
		]))
		.pipe(extReplace('.webp'))

		.pipe(size({ showFiles: true, title: 'WEBP Image Created --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory))
		.pipe(notify({ message: 'WEBP Media created', onLast: true }));
}
wepb.description = 'Create WEBP Media files from source files of other formats';
wepb.defaults = {
	IMAGEMIN_WEBP_OPTIONS,
};

module.exports = wepb;
