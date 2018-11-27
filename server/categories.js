'use strict';
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const PATH_FILE_CATEGORY = path.join(__dirname, '../data/categories.json');

function sortByOrder(listCategory = []) {
	return _._.sortBy(listCategory, ['order'], ['asc']);
}

function loadListCategories() {
	return sortByOrder(require(PATH_FILE_CATEGORY));
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

	return _.compact(res)
}

function changeById(listCategory = [], categoryData) {
	let res = [];
	listCategory.map(category => {
		if (category.id === categoryData.id) {
			res[category.id] = {
				id: parseInt(categoryData.id),
				name: categoryData.name,
				order: categoryData.order,
				parentId: parseInt(categoryData.parentId),
			}
		} else {
			res[category.id] = category;
		}
	});
	return _.compact(res);
}

function saveListToJsonFile(listCategory = []) {
	let listSave = [];
	listCategory.map(cat => {
		if (cat.child) {
			delete cat.child;
		}
		listSave.push(cat)
	});
	fs.writeFileSync(PATH_FILE_CATEGORY, JSON.stringify(listSave));
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

	return sortByOrder(_.compact(res));
}

function getNewId(listCategory = []) {
	let max = 0;
	if (listCategory) {
		listCategory.map(category => {
			max = max < category.id ? category.id : max;
		});
	}

	return max + 1;
}

function addToList(listCategory = [], dataCategory) {
	let id = getNewId(listCategory);

	listCategory[id] = {
		id: id,
		name: dataCategory.name,
		order: parseInt(dataCategory.order),
		parentId: parseInt(dataCategory.parentId)
	};
	return _.compact(listCategory);
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

module.exports.addCategory = function (dataCategory) {
	saveListToJsonFile(addToList(loadListCategories(), dataCategory));
	return {
		message: `Success adding "${dataCategory.name}"`,
		messageType: 'success',
		dataCategory: dataCategory,
	};
};
