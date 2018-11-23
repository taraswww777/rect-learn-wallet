'use strict';

const path = require('path');
const PORT = process.env.PORT || 5000;
const ROOT = path.join(__dirname);
const ROOT_BUILD = path.join(ROOT, '/build');


module.exports = {
	PORT: PORT,
	ROOT: ROOT,
	ROOT_BUILD: ROOT_BUILD,
};
