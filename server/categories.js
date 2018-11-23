'use strict';

function loadListCategories() {
	return require('../data/categoryes');
}

function filterListCategoryById(listCategory = [], categoryId) {
	let res = false;
	listCategory.map(category => {
		if (!res) {
			res = category.id === categoryId && category;

			if (category.child) {
				res = filterListCategoryById(category.child, categoryId)
			}
		}
	});
	return res;
}

module.exports.getListAll = function () {
	return loadListCategories();
};

module.exports.getById = function (categoryId) {
	let listCategory = loadListCategories();
	return filterListCategoryById(listCategory, categoryId);
};
