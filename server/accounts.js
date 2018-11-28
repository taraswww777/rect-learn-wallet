import {
	addToList,
	changeElemInList, deleteListElemById,
	getElemFromListById,
	loadFromJsonFile,
	saveToJsonFile,
	sortListByOrder
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
		name: account.name,
	};
	return changeElemInList(listAccounts, accountPrepare)
}

// function getCategoryByIdFromList(listCategory = [], categoryId) {
// 	let res = false;
// 	categoryId = parseInt(categoryId);
// 	listCategory.map(category => {
// 		if (!res) {
// 			res = category.id === categoryId && category;
// 		}
// 	});
// 	return res;
// }


// function deleteListElemById(listCategory = [], categoryId) {
// 	let res = listCategory;
// 	categoryId = String(categoryId);
// 	if (listCategory) {
// 		listCategory.map((category, index) => {
// 			if (String(category.id) === categoryId) {
// 				console.log('delete res[index];', index);
// 				delete res[index];
// 			} else if (category.child) {
// 				category.child = deleteListElemById(category.child, categoryId);
// 			}
// 		});
// 	}
//
// 	return _.compact(res)
// }



module.exports.getListAll = () => sortListByOrder(loadAccountsList());

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
