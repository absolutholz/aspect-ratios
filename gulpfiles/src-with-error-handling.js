// https://gomakethings.com/my-gulp-setup/

/* eslint-disable-next-line object-curly-newline */
const { gulp, notify, plumber } = require('./common-packages');

const _gulpsrc = gulp.src;

gulp.src = (...args) => (
	_gulpsrc(...args)
		.pipe(plumber({
			/* eslint-disable-next-line func-names, object-shorthand */
			errorHandler: function (error) { // needs to be written in this manner because of the plugin and use of this
				notify.onError({
					title: `Gulp error in ${error.plugin}`,
					message: `Error: ${error.formatted}`,
				})(error);
				this.emit('end');
			},
		}))
);
