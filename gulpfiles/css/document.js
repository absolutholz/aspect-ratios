const sassdoc = require('sassdoc'); // http://sassdoc.com/

const { gulp, prettyError } = require('../common-packages');

const SASSDOC_OPTIONS = {
	dest: 'docs',
	verbose: true,
	// display: {
	//   access: ['public', 'private'],
	//   alias: true,
	//   watermark: true,
	// },
	// groups: {
	//   'undefined': 'Ungrouped',
	//   foo: 'Foo group',
	//   bar: 'Bar group',
	// },
	// basePath: 'https://github.com/SassDoc/sassdoc',
};

function document(sourceFiles, sassDocOptions = SASSDOC_OPTIONS) {
	console.log(sassDocOptions);
	return gulp.src(sourceFiles)
		.pipe(prettyError())
		.pipe(sassdoc(sassDocOptions));
}
document.description = 'Create SassDoc documentation';
document.defaults = {
	SASSDOC_OPTIONS,
};

module.exports = document;
