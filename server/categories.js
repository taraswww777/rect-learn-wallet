'use strict';
const fs = require('fs');
const path = require('path');
const PATH_FILE_CATEGORY = path.join(__dirname, '../data/categories.json');


function loadListCategories() {
	return require(PATH_FILE_CATEGORY);
}

function getCategoryByIdFromList(listCategory = [], categoryId) {
	let res = false;
	categoryId = parseInt(categoryId);
	listCategory.map(category => {
		if (!res) {
			res = category.id === categoryId && category;
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
	listCategory[categoryData.id] = categoryData;
	return listCategory.filter(el => el);
}

function saveListToJsonFile(listCategory = []) {
	let stream = fs.createWriteStream(PATH_FILE_CATEGORY);
	let res = false;
	stream.once('open', (fd) => {
		res = stream.write(JSON.stringify(listCategory));
		stream.end();
	});
	return res;
}

function listToTree(listCategory = [], parentId = 0) {
	let res = [];

	if (listCategory) {
		listCategory.map(category => {
			if (category.parentId === parentId) {
				res[category.id] = category;
				res[category.id]['child'] = listToTree(listCategory, category.id);
			}
		});
	}

	return res.filter(el => el);
}

module.exports.getListAll = function () {
	return loadListCategories();
};

module.exports.getTreeAll = function () {
	return listToTree(loadListCategories());
};

module.exports.getById = function (categoryId) {
	let listCategory = loadListCategories();
	return getCategoryByIdFromList(listCategory, categoryId);
};

module.exports.delById = function (categoryId) {
	let listCategory = loadListCategories();
	let category = getCategoryByIdFromList(listCategory, categoryId);
	listCategory = delById(listCategory, categoryId);
	saveListToJsonFile(listCategory);

	return {
		message: `Success delete "${category.name}"`,
		messageType: 'success',
		categoryId: categoryId,
	};
};

module.exports.saveById = function (categoryId, dataCategory) {
	saveListToJsonFile(changeById(loadListCategories(), dataCategory));

	return {
		message: `Success saving "${dataCategory.name}"`,
		messageType: 'success',
		dataCategory: dataCategory,
	};
};
