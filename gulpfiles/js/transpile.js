const babel = require('gulp-babel'); // https://www.npmjs.com/package/gulp-babel

/* eslint-disable-next-line object-curly-newline */
const { gulp, newer, notify, sourcemaps, size } = require('../common-packages');

const BABEL_PRESETS = [
	[
		'@babel/preset-env',
		// browserconfig in .browserslistrc
		// https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
	],
];
const BABEL_PLUGINS = [
	// ['@babel/plugin-syntax-dynamic-import'],
];

function transpile(sourceFiles, destinationDirectory, babelPresets = BABEL_PRESETS, babelPlugins = BABEL_PLUGINS) {
	return gulp.src(sourceFiles, { sourcemaps: true }) // gulp 4 sourcemaps: https://fettblog.eu/gulp-4-sourcemaps/
		.pipe(newer({
			dest: destinationDirectory,
		}))

		.pipe(sourcemaps.init())

		.pipe(babel(
			{
				presets: babelPresets,
				plugins: babelPlugins,
			},
		))

		.pipe(sourcemaps.write('/'))

		.pipe(size({ showFiles: true, title: 'JS Generated --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory))
		.pipe(notify({ message: 'JS transpilation complete', onLast: true }));
}
transpile.description = 'Transpile ECMAScript code to JS';
transpile.defaults = {
	BABEL_PRESETS,
	BABEL_PLUGINS,
};

module.exports = transpile;
