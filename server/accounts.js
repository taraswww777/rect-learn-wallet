import {
	addToList,
	changeElemInList, deleteListElemById,
	getElemFromListById,
	loadFromJsonFile,
	saveToJsonFile,
	sortListByOrderAsc
} from "./lib";
import path from "path";

const PATH_FILE_ACCOUNTS = path.join(__dirname, '../data/accounts.json');

function loadAccountsList() {
	return loadFromJsonFile(PATH_FILE_ACCOUNTS) || [];
}

function saveAccounts(dataForSave) {
	return saveToJsonFile(PATH_FILE_ACCOUNTS, dataForSave);
}

function changeAccount(listAccounts = [], account) {
	let accountPrepare = {
		id: parseInt(account.id),
		order: parseInt(account.order),
		amount: parseFloat(account.amount) || 0,
		name: account.name,
	};
	return changeElemInList(listAccounts, accountPrepare)
}

module.exports.getListAll = () => sortListByOrderAsc(loadAccountsList());

module.exports.getById = (accountId) => {
	return getElemFromListById(loadAccountsList(), accountId);
};

module.exports.delById = (accountId) => {
	let listAccounts = loadAccountsList();
	let account = getElemFromListById(listAccounts, accountId);

	saveAccounts(deleteListElemById(listAccounts, accountId));

	return {
		message: `Success delete "${account.name}"`,
		messageType: 'success',
		categoryId: accountId,
	};
};

module.exports.saveById = (accountId, dataAccount) => {
	saveAccounts(changeAccount(loadAccountsList(), dataAccount));

	return {
		message: `Success saving "${dataAccount.name}"`,
		messageType: 'success',
		dataCategory: dataAccount,
	};
};


module.exports.addAccount = (dataAccount) => {
	saveAccounts(addToList(loadAccountsList(), dataAccount));

	return {
		message: `Success adding "${dataAccount.name}"`,
		messageType: 'success',
		dataCategory: dataAccount,
	};
};
