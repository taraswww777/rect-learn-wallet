import {
	addToList,
	changeElemInList, deleteListElemById,
	getElemFromListById,
	loadFromJsonFile,
	saveToJsonFile,
	sortListByOrderAsc
} from "./lib";
import path from "path";

const PATH_FILE_RECORDS = path.join(__dirname, '../data/records.json');

function recordsLoadList() {
	return loadFromJsonFile(PATH_FILE_RECORDS) || [];
}

function saveRecords(dataForSave) {
	return saveToJsonFile(PATH_FILE_RECORDS, dataForSave);
}

function changeRecord(listRecords = [], record) {
	let recordPrepare = {
		id: parseInt(record.id),
		name: record.name,
		date: record.date,
		sum: record.sum,
		type: record.type,
		accountId: parseInt(record.accountId),
		categoryId: parseInt(record.categoryId),
	};
	return changeElemInList(listRecords, recordPrepare)
}

module.exports.getListAll = () => sortListByOrderAsc(recordsLoadList());

module.exports.getById = (recordId) => {
	return getElemFromListById(recordsLoadList(), recordId);
};

module.exports.delById = (recordId) => {
	let listRecords = recordsLoadList();
	let record = getElemFromListById(listRecords, recordId);

	saveRecords(deleteListElemById(listRecords, recordId));

	return {
		message: `Success delete "${record.name}"`,
		messageType: 'success',
		record: record,
	};
};

module.exports.updateById = (recordId, record) => {
	saveRecords(changeRecord(recordsLoadList(), record));

	return {
		message: `Success saving "${record.name}"`,
		messageType: 'success',
		record: record,
	};
};

module.exports.addRecord = (record) => {
	saveRecords(addToList(recordsLoadList(), record));

	return {
		message: `Success adding "${record.name}"`,
		messageType: 'success',
		record: record,
	};
};
