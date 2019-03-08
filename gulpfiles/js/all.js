/* eslint-disable import/no-dynamic-require */
const transpile = require(`${__dirname}/transpile`);
const optimize = require(`${__dirname}/optimize`);
const lint = require(`${__dirname}/lint`);

module.exports = {
	transpile,
	optimize,
	lint,
};
