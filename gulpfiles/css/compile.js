const packages = require('../common-packages');
const gulp = packages.gulp;

const autoprefixer = require('autoprefixer'); // https://www.npmjs.com/package/autoprefixer
const postcss = require('gulp-postcss'); // https://github.com/postcss/gulp-postcss
const sass = require('gulp-sass'); // https://www.npmjs.com/package/gulp-sass
const sassGlob = require('gulp-sass-glob'); // https://www.npmjs.com/package/gulp-sass-glob

const SASS_OPTIONS = {
	style: 'expanded',
	includePaths: ['./'],
};

function compile (sourceFiles, destinationDirectory, sassOptions = SASS_OPTIONS) {
	return gulp.src(sourceFiles, { sourcemaps: true }) // gulp 4 sourcemaps: https://fettblog.eu/gulp-4-sourcemaps/
		.pipe(packages.prettyError())

		.pipe(packages.newer({
			dest: destinationDirectory,
			ext: '.css',
			extra: sourceFiles,
		}))

		.pipe(packages.sourcemaps.init())

		.pipe(sassGlob())
		.pipe(sass(sassOptions))
		.pipe(postcss([
			autoprefixer(), // browserconfig in .browserslistrc
		]))

		.pipe(packages.sourcemaps.write('/'))

		.pipe(packages.size({ showFiles: true, title: 'CSS Generated --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory));
};
compile.description = 'Compile CSS from SCSS';
compile.defaults = {
	SASS_OPTIONS
};

module.exports = compile;
