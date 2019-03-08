/**
 * Config Options: https://eslint.org/docs/user-guide/configuring
 * Helpful: https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6
 */
module.exports = {
	extends: 'airbnb-base', // https://github.com/airbnb/javascript
	rules: {
		'indent': ['error', 'tab', { 'SwitchCase': 1 }],
		'no-tabs': 0,
		'no-underscore-dangle': 0,
		'max-len': 0,
		'import/no-unresolved': 0,
		'import/prefer-default-export': 0,
		'import/no-extraneous-dependencies': ['error', { 'devDependencies': false }],
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parserOptions: {
		sourceType: 'module',
	},
};
