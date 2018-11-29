import * as fs from 'fs';

const _ = require('lodash');

export function loadFromJsonFile(pathToFile) {
	let content = fs.readFileSync(pathToFile, "utf8");

	try {
		return JSON.parse(content)
	} catch (e) {
		return null;
	}
}

export function saveToJsonFile(pathToFile, dataForSave) {
	let content = JSON.stringify(dataForSave);
	if (!fs.existsSync(pathToFile)) {
		stream.once('w', () => {
			stream.write(content);
			stream.end();
		});
	} else {
		fs.writeFileSync(pathToFile, content);
	}
}

export function sortListByOrderAsc(list = []) {
	return _._.sortBy(list, ['order'], ['asc']);
}

export function sortListByOrderDesc(list = []) {
	return _._.sortBy(list, ['order'], ['desc']);
}

export function getNewId(list = []) {
	let max = 0;
	if (list) {
		list.map(elem => {
			max = max < elem.id ? elem.id : max;
		});
	}

	return max + 1;
}

export function addToList(list = [], newElem) {
	let id = getNewId(list);

	console.log('newElem',newElem);

	list[id] = Object.assign({id: id}, newElem);
	return _.compact(list);
}

export function changeElemInList(list = [], newElem) {
	let res = [];
	if (list) {
		list.map(elem => {
			if (elem.id === newElem.id) {
				res[elem.id] = newElem;
			} else {
				res[elem.id] = elem;
			}
		});
	}
	return _.compact(res);
}

export function getElemFromListById(list = [], id) {
	return _.filter(list, {'id': parseInt(id)}).shift();
}

export function deleteListElemById(list = [], id) {
	id = parseInt(id);
	return _.compact(_.filter(list, elem => elem.id !== id))
}
