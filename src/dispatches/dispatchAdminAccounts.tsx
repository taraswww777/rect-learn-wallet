import axios from "axios";
import {BASE_URL_API} from "../config";
import {
	ADMIN_ACCOUNT_SET_DELETING_REPORT, ADMIN_ACCOUNT_SET_DELETING_STATUS,
	ADMIN_ACCOUNT_SET_SAVING_REPORT,
	ADMIN_ACCOUNT_SET_SAVING_STATUS,
	ADMIN_ACCOUNTS_SET_ITEM,
	ADMIN_ACCOUNTS_SET_LIST,
	ADMIN_ACCOUNTS_SET_LOAD_ITEM_STATUS,
	ADMIN_ACCOUNTS_SET_LOAD_LIST_STATUS, STATUS_DELETING_ACCOUNT_COMPLETE,
	STATUS_DELETING_ACCOUNT_IN_PROCESS,
	STATUS_LOADING_ACCOUNT_ITEM_COMPLETE,
	STATUS_LOADING_ACCOUNT_ITEM_IN_PROCESS,
	STATUS_LOADING_ACCOUNTS_LIST_COMPLETE,
	STATUS_LOADING_ACCOUNTS_LIST_IN_PROCESS,
	STATUS_SAVING_ACCOUNT_COMPLETE,
	STATUS_SAVING_ACCOUNT_IN_PROCESS
} from "../reducers/ReducerAccounts";
import {InterfaceAccount} from "../types/InterfaceAccount";
import {TypeDispatch} from "../types/InterfaceAction";
import {typeFunction} from "../types/Interfaces";

const URL_GET_ACCOUNTS_LIST = `${BASE_URL_API}/api/getAccountsList`;
const URL_SAVE_ACCOUNT_BY_ID = `${BASE_URL_API}/api/saveAccountById`;

function addAccount(dispatch: TypeDispatch) {
	return (account: InterfaceAccount) => {

		const url = encodeURI(`${BASE_URL_API}/api/addAccount`);
		const postParams = {
			name: account.name,
			order: account.order,
		};

		dispatch({type: ADMIN_ACCOUNT_SET_SAVING_STATUS, payload: STATUS_SAVING_ACCOUNT_IN_PROCESS});
		return axios.post(url, postParams)
			.then(response => dispatch({type: ADMIN_ACCOUNT_SET_SAVING_REPORT, payload: response.data}))
			.then(() => dispatch({type: ADMIN_ACCOUNT_SET_SAVING_STATUS, payload: STATUS_SAVING_ACCOUNT_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function loadAccountsList(dispatch: TypeDispatch) {
	return () => {
		const url = encodeURI(URL_GET_ACCOUNTS_LIST);

		dispatch({type: ADMIN_ACCOUNTS_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_ACCOUNTS_LIST_IN_PROCESS});

		return axios.get(url)
			.then(response => dispatch({type: ADMIN_ACCOUNTS_SET_LIST, payload: response.data}))
			.then(() => dispatch({type: ADMIN_ACCOUNTS_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_ACCOUNTS_LIST_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
				dispatch({type: ADMIN_ACCOUNTS_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_ACCOUNTS_LIST_COMPLETE});
			});
	}
}

function saveAccount(dispatch: TypeDispatch) {
	return (account: InterfaceAccount) => {

		const url = encodeURI(`${URL_SAVE_ACCOUNT_BY_ID}/${account.id}`);

		const postParams = {
			id: account.id,
			name: account.name,
			order: account.order,
		};

		dispatch({type: ADMIN_ACCOUNT_SET_SAVING_STATUS, payload: STATUS_SAVING_ACCOUNT_IN_PROCESS});
		return axios.post(url, postParams)
			.then(response => dispatch({type: ADMIN_ACCOUNT_SET_SAVING_REPORT, payload: response.data}))
			.then(() => dispatch({type: ADMIN_ACCOUNT_SET_SAVING_STATUS, payload: STATUS_SAVING_ACCOUNT_COMPLETE}))
			.then(() => dispatch({type: ADMIN_ACCOUNTS_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_ACCOUNTS_LIST_IN_PROCESS}))
			.then(() => loadAccountsList(dispatch)())
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function loadAccountById(dispatch: TypeDispatch) {
	return (accountId: number) => {
		const url = encodeURI(`${BASE_URL_API}/api/getAccountById/${accountId}`);
		dispatch({type: ADMIN_ACCOUNTS_SET_LOAD_ITEM_STATUS, payload: STATUS_LOADING_ACCOUNT_ITEM_IN_PROCESS});

		return axios.get(url)
			.then(response => dispatch({type: ADMIN_ACCOUNTS_SET_ITEM, payload: response.data}))
			.then(() => dispatch({type: ADMIN_ACCOUNTS_SET_LOAD_ITEM_STATUS, payload: STATUS_LOADING_ACCOUNT_ITEM_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function deleteAccountById(dispatch: TypeDispatch) {
	return (accountId: number) => {
		const url = encodeURI(`${BASE_URL_API}/api/delAccountById/${accountId}`);
		dispatch({type: ADMIN_ACCOUNT_SET_DELETING_STATUS, payload: STATUS_DELETING_ACCOUNT_IN_PROCESS});
		axios.get(url)
			.then(response => dispatch({type: ADMIN_ACCOUNT_SET_DELETING_REPORT, payload: response.data}))
			.then(() => dispatch({type: ADMIN_ACCOUNT_SET_DELETING_STATUS, payload: STATUS_DELETING_ACCOUNT_COMPLETE}))
			.then(() => loadAccountsList(dispatch)())
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

export type typeFunctionAddAccount = (account: InterfaceAccount) => void;
export type typeFunctionSaveAccount = (account: InterfaceAccount) => void;
export type typeFunctionLoadAccountsList = typeFunction;
export type typeFunctionLoadAccountById = (accountId: number) => void;
export type typeDeleteAccountById = (accountId: number) => void;


export default (dispatch: TypeDispatch) => ({
	addAccount: addAccount(dispatch),
	deleteAccountById: deleteAccountById(dispatch),
	loadAccountById: loadAccountById(dispatch),
	loadAccountList: loadAccountsList(dispatch),
	saveAccount: saveAccount(dispatch),
})
