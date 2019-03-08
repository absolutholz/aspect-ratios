/* eslint-disable import/no-dynamic-require */
const compile = require(`${__dirname}/compile`);
const optimize = require(`${__dirname}/optimize`);
const lint = require(`${__dirname}/lint`);
const document = require(`${__dirname}/document`);

module.exports = {
	compile,
	optimize,
	lint,
	document,
};
