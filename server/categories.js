'use strict';

function loadListCategories() {
	return require('../data/categoryes');
}

module.exports.getListAll = function () {
	return loadListCategories();
};
