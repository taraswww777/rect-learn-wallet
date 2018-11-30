import axios from "axios";
import {BASE_URL_API} from "../config";
import {
	RECORDS_SET_DELETING_REPORT,
	RECORDS_SET_DELETING_STATUS,
	RECORDS_SET_ITEM,
	RECORDS_SET_LIST,
	RECORDS_SET_LOAD_ITEM_STATUS,
	RECORDS_SET_LOAD_LIST_STATUS, RECORDS_SET_SAVING_REPORT, RECORDS_SET_SAVING_STATUS,
	RECORDS_STATUS_DELETING_COMPLETE,
	RECORDS_STATUS_DELETING_IN_PROCESS,
	RECORDS_STATUS_LOADING_ITEM_COMPLETE,
	RECORDS_STATUS_LOADING_ITEM_IN_PROCESS,
	RECORDS_STATUS_LOADING_LIST_COMPLETE,
	RECORDS_STATUS_LOADING_LIST_IN_PROCESS, RECORDS_STATUS_SAVING_COMPLETE, RECORDS_STATUS_SAVING_IN_PROCESS
} from "../reducers/ReducerRecords";
import {TypeDispatch} from "../types/InterfaceAction";
import {InterfaceRecord} from "../types/InterfaceRecord";
import {typeFunction} from "../types/Interfaces";


const RECORDS_URL_GET_LIST = `${BASE_URL_API}/api/recordsGetList`;
const RECORDS_URL_SAVE_BY_ID = `${BASE_URL_API}/api/recordsUpdateById`;
const RECORDS_URL_DEL_BY_ID = `${BASE_URL_API}/api/recordsDelById`;
const RECORDS_URL_GET_BY_ID = `${BASE_URL_API}/api/recordsGetById`;
const RECORDS_URL_ADD = `${BASE_URL_API}/api/recordsAdd`;

function recordsAdd(dispatch: TypeDispatch) {
	return (record: InterfaceRecord) => {

		const url = encodeURI(RECORDS_URL_ADD);
		const postParams = {
			accountId: record.accountId,
			categoryId: record.categoryId,
			date: new Date(),
			name: record.name,
			sum: record.sum,
			type: record.type,
		};

		dispatch({type: RECORDS_SET_SAVING_STATUS, payload: RECORDS_STATUS_SAVING_IN_PROCESS});
		return axios.post(url, postParams)
			.then(response => dispatch({type: RECORDS_SET_SAVING_REPORT, payload: response.data}))
			.then(() => dispatch({type: RECORDS_SET_SAVING_STATUS, payload: RECORDS_STATUS_SAVING_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function recordsLoadList(dispatch: TypeDispatch): fnRecordsLoadList {
	return () => {
		const url = encodeURI(RECORDS_URL_GET_LIST);

		dispatch({type: RECORDS_SET_LOAD_LIST_STATUS, payload: RECORDS_STATUS_LOADING_LIST_IN_PROCESS});

		return axios.get(url)
			.then(response => dispatch({type: RECORDS_SET_LIST, payload: response.data}))
			.then(() => dispatch({type: RECORDS_SET_LOAD_LIST_STATUS, payload: RECORDS_STATUS_LOADING_LIST_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function recordsUpdate(dispatch: TypeDispatch) {
	return (record: InterfaceRecord) => {

		const url = encodeURI(`${RECORDS_URL_SAVE_BY_ID}/${record.id}`);

		const postParams = {
			accountId: record.accountId,
			categoryId: record.categoryId,
			date: record.date,
			id: record.id,
			sum: record.sum,
			type: record.type,
		};

		dispatch({type: RECORDS_SET_SAVING_STATUS, payload: RECORDS_STATUS_SAVING_IN_PROCESS});

		return axios.post(url, postParams)
			.then(response => dispatch({type: RECORDS_SET_SAVING_REPORT, payload: response.data}))
			.then(() => dispatch({type: RECORDS_SET_SAVING_STATUS, payload: RECORDS_STATUS_SAVING_COMPLETE}))
			.then(() => dispatch({type: RECORDS_SET_LOAD_LIST_STATUS, payload: RECORDS_STATUS_LOADING_LIST_IN_PROCESS}))
			.then(() => recordsLoadList(dispatch)())
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function recordsLoadById(dispatch: TypeDispatch) {
	return (recordId: number) => {
		const url = encodeURI(`${RECORDS_URL_GET_BY_ID}/${recordId}`);
		dispatch({type: RECORDS_SET_LOAD_ITEM_STATUS, payload: RECORDS_STATUS_LOADING_ITEM_IN_PROCESS});

		return axios.get(url)
			.then(response => dispatch({type: RECORDS_SET_ITEM, payload: response.data}))
			.then(() => dispatch({type: RECORDS_SET_LOAD_ITEM_STATUS, payload: RECORDS_STATUS_LOADING_ITEM_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function recordsDelById(dispatch: TypeDispatch) {
	return (accountId: number) => {
		const url = encodeURI(`${RECORDS_URL_DEL_BY_ID}/${accountId}`);

		dispatch({type: RECORDS_SET_DELETING_STATUS, payload: RECORDS_STATUS_DELETING_IN_PROCESS});

		return axios.get(url)
			.then(response => dispatch({type: RECORDS_SET_DELETING_REPORT, payload: response.data}))
			.then(() => dispatch({type: RECORDS_SET_DELETING_STATUS, payload: RECORDS_STATUS_DELETING_COMPLETE}))
			.then(() => recordsLoadList(dispatch)())
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

export type fnRecordsAdd = (record: InterfaceRecord) => void;
export type fnRecordsUpdate = (record: InterfaceRecord) => void;
export type fnRecordsLoadList = typeFunction;
export type fnRecordsLoadById = (recordId: number) => void;
export type fnRecordsDeleteById = (recordId: number) => void;

export interface InterfaceRecordsDispatcher {
	recordsAdd: fnRecordsAdd;
	recordsDelById: fnRecordsDeleteById;
	recordsLoadById: fnRecordsLoadById;
	recordsLoadList: fnRecordsLoadList;
	recordsUpdate: fnRecordsUpdate;
}

export default function dispatchRecords(dispatch: TypeDispatch): InterfaceRecordsDispatcher {
	return {
		recordsAdd: recordsAdd(dispatch),
		recordsDelById: recordsDelById(dispatch),
		recordsLoadById: recordsLoadById(dispatch),
		recordsLoadList: recordsLoadList(dispatch),
		recordsUpdate: recordsUpdate(dispatch),
	};
}
