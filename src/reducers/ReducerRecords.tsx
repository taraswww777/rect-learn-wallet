import {InterfaceAction} from 'src/types/InterfaceAction';

export const RECORDS_SET_LOAD_ITEM_STATUS = 'RECORDS_SET_LOAD_ITEM_STATUS';
export const RECORDS_SET_ITEM = 'RECORDS_SET_ITEM';
export const RECORDS_STATUS_LOADING_ITEM_IN_PROCESS = 1;
export const RECORDS_STATUS_LOADING_ITEM_COMPLETE = 2;

export const RECORDS_SET_LOAD_LIST_STATUS = 'RECORDS_SET_LOAD_LIST_STATUS';
export const RECORDS_SET_LIST = 'RECORDS_SET_LIST';
export const RECORDS_STATUS_LOADING_LIST_IN_PROCESS = 3;
export const RECORDS_STATUS_LOADING_LIST_COMPLETE = 4;


export const RECORDS_SET_SAVING_STATUS = 'RECORDS_SET_SAVING_STATUS';
export const RECORDS_SET_SAVING_REPORT = 'RECORDS_SET_SAVING_REPORT';
export const RECORDS_STATUS_SAVING_IN_PROCESS = 5;
export const RECORDS_STATUS_SAVING_COMPLETE = 6;

export const RECORDS_SET_DELETING_STATUS = 'RECORDS_SET_DELETING_STATUS';
export const RECORDS_SET_DELETING_REPORT = 'RECORDS_SET_DELETING_REPORT';
export const RECORDS_STATUS_DELETING_IN_PROCESS = 7;
export const RECORDS_STATUS_DELETING_COMPLETE = 8;


const stateDefault = {
	list: [],
};

export default (state = stateDefault, action: InterfaceAction) => {
	switch (action.type) {
		case RECORDS_SET_LIST:
			return {
				...state,
				list: action.payload
			};
		case RECORDS_SET_LOAD_LIST_STATUS:
			return {
				...state,
				loadListStatus: action.payload
			};

		case RECORDS_SET_ITEM:
			return {
				...state,
				item: action.payload
			};
		case RECORDS_SET_LOAD_ITEM_STATUS:
			return {
				...state,
				loadItemStatus: action.payload
			};

		case RECORDS_SET_SAVING_STATUS:
			return {
				...state,
				savingStatus: action.payload
			};

		case RECORDS_SET_DELETING_STATUS:
			return {
				...state,
				deletingStatus: action.payload
			};

		case RECORDS_SET_DELETING_REPORT:
			return {
				...state,
				deletingReport: action.payload
			};
		case RECORDS_SET_SAVING_REPORT:
			return {
				...state,
				savingReport: action.payload
			};

		default:
			return state;
	}
}
