const imagemin = require('gulp-imagemin');
const path = require('path');
const svgSprite = require('gulp-svg-sprite'); // https://www.npmjs.com/package/gulp-svg-sprite

/**
 * [Reference: A Gulp-Based External SVG Symbol Sprite Icon System](https://una.im/svg-icons/)
 * [Reference: Creating SVG Sprites using Gulp and Sass](https://www.liquidlight.co.uk/blog/article/creating-svg-sprites-using-gulp-and-sass/)
 * [Reference: Is it possible to set up an ID generator to simply out put the file name, and not the directory?](https://github.com/jkphl/svg-sprite/issues/172)
 */

const { gulp, notify, size } = require('../common-packages');

const SVGSPRITE_OPTIONS = {
	shape: { // SVG shape related options
		id: { // SVG shape ID related options
			// separator: '--', // Separator for directory name traversal
			generator: name => `icon-${path.basename(name.replace(/\s+/g, this.whitespace), '.svg')}`, // SVG shape ID generator callback
			// pseudo: '~', // File name separator for shape states (e.g. ':hover')
		},
	},
	mode: {
		symbol: { // symbol mode to build the SVG
			render: {
				// 	css: false, // CSS output option for icon sizing
				// 	scss: false, // SCSS output option for icon sizing
			},
			dest: '.', // destination folder
			// prefix: '.icon--%s', // BEM-style prefix if styles rendered
			sprite: 'icon-sprite.svg', // generated sprite name
			// example: false, // Build a sample page, please!
		},
	},
	svg: { // General options for created SVG files
		// xmlDeclaration: false, // Add XML declaration to SVG sprite
		// doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
		// namespaceIDs: false, // Add namespace token to all IDs in SVG shapes
		// namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
		// dimensionAttributes: true, // Width and height attributes on the sprite
	},
	// variables: {},
};

const IMAGEMIN_SVGO_OPTIONS = {
	plugins: [
		{
			removeTitle: false,
			removeDesc: false,
		},
	],
};

function sprite(sourceFiles, destinationDirectory, svgSpriteOptions = SVGSPRITE_OPTIONS, imageminSvgoOptions = IMAGEMIN_SVGO_OPTIONS) {
	return gulp.src(sourceFiles)

		.pipe(imagemin([
			imagemin.svgo(imageminSvgoOptions),
		], {
			verbose: true,
		}))

		.pipe(svgSprite(svgSpriteOptions))

		.pipe(size({ showFiles: true, title: 'SVG Sprite Generated --->' })) // size before dest results in better output in the console
		.pipe(gulp.dest(destinationDirectory))
		.pipe(notify({ message: 'SVG Sprite creation complete', onLast: true }));
}
sprite.description = 'Create SVG sprite from individual SVG files';
sprite.defaults = {
	SVGSPRITE_OPTIONS,
	IMAGEMIN_SVGO_OPTIONS,
};

module.exports = sprite;
