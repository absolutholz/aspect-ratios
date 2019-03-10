/* eslint-disable import/no-dynamic-require */
const transpile = require(`${__dirname}/transpile`);
const optimize = require(`${__dirname}/optimize`);
const lint = require(`${__dirname}/lint`);
const document = require(`${__dirname}/document`);

module.exports = {
	transpile,
	optimize,
	lint,
	document,
};
