'use strict';
const fs = require('fs');
const path = require('path');

function loadListCategories() {
	return require('../data/categoryes');
}

function filterListCategoryById(listCategory = [], categoryId) {
	let res = false;
	listCategory.map(category => {
		if (!res) {
			res = category.id === categoryId && category;

			if (!res && category.child) {
				res = filterListCategoryById(category.child, categoryId)
			}
		}
	});
	return res;
}

function delById(listCategory = [], categoryId) {
	let res = listCategory;
	categoryId = String(categoryId);
	if (listCategory) {
		listCategory.map((category, index) => {
			if (String(category.id) === categoryId) {
				console.log('delete res[index];', index);
				delete res[index];
			} else if (category.child) {
				category.child = delById(category.child, categoryId);
			}
		});
	}
	return res.filter(el => el);
}

function changeById(listCategory = [], categoryData) {
	let res = listCategory;
	let categoryId = String(categoryData.id);
	if (listCategory) {
		listCategory.map((category, index) => {
			if (String(category.id) === categoryId) {
				console.log('delete res[index];', index);
				res[index] = {
					...res[index],
					categoryData
				};
			} else if (category.child) {
				category.child = delById(category.child, categoryId);
			}
		});
	}
	return res.filter(el => el);
}

module.exports.getListAll = function () {
	return loadListCategories();
};

module.exports.getById = function (categoryId) {
	let listCategory = loadListCategories();
	return filterListCategoryById(listCategory, parseInt(categoryId));
};

module.exports.saveById = function (categoryId, dataCategory) {
	let listCategory = changeById(loadListCategories(), dataCategory);
	let pathFile = path.join(__dirname, '../data/categoryes.json');

	let stream = fs.createWriteStream(pathFile);
	stream.once('open', (fd) => {
		stream.write(JSON.stringify(listCategory));
		stream.end();
	});
};
