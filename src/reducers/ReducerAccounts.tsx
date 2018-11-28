import {InterfaceAction} from 'src/types/InterfaceAction';

export const ADMIN_ACCOUNTS_SET_LOAD_ITEM_STATUS = 'ADMIN_ACCOUNTS_SET_LOAD_ITEM_STATUS';
export const ADMIN_ACCOUNTS_SET_ITEM = 'ADMIN_ACCOUNTS_SET_ITEM';
export const STATUS_LOADING_ACCOUNT_ITEM_IN_PROCESS = 1;
export const STATUS_LOADING_ACCOUNT_ITEM_COMPLETE = 2;

export const ADMIN_ACCOUNTS_SET_LOAD_LIST_STATUS = 'ADMIN_ACCOUNTS_SET_LOAD_LIST_STATUS';
export const ADMIN_ACCOUNTS_SET_LIST = 'ADMIN_ACCOUNTS_SET_LIST';
export const STATUS_LOADING_ACCOUNTS_LIST_IN_PROCESS = 3;
export const STATUS_LOADING_ACCOUNTS_LIST_COMPLETE = 4;


export const ADMIN_ACCOUNT_SET_SAVING_STATUS = 'ADMIN_ACCOUNT_SET_SAVING_STATUS';
export const ADMIN_ACCOUNT_SET_SAVING_REPORT = 'ADMIN_ACCOUNT_SET_SAVING_REPORT';
export const STATUS_SAVING_ACCOUNT_IN_PROCESS = 5;
export const STATUS_SAVING_ACCOUNT_COMPLETE = 6;

export const ADMIN_ACCOUNT_SET_DELETING_STATUS = 'ADMIN_ACCOUNT_SET_DELETING_STATUS';
export const ADMIN_ACCOUNT_SET_DELETING_REPORT = 'ADMIN_ACCOUNT_SET_DELETING_REPORT';
export const STATUS_DELETING_ACCOUNT_IN_PROCESS = 7;
export const STATUS_DELETING_ACCOUNT_COMPLETE = 8;


const stateDefault = {
	accountsList: [],
};

export default (state = stateDefault, action: InterfaceAction) => {
	switch (action.type) {
		case ADMIN_ACCOUNTS_SET_LIST:
			return {
				...state,
				accountsList: action.payload
			};
		case ADMIN_ACCOUNTS_SET_LOAD_LIST_STATUS:
			return {
				...state,
				loadAccountsListStatus: action.payload
			};

		case ADMIN_ACCOUNTS_SET_ITEM:
			return {
				...state,
				accountItem: action.payload
			};
		case ADMIN_ACCOUNTS_SET_LOAD_ITEM_STATUS:
			return {
				...state,
				loadAccountItemStatus: action.payload
			};

		case ADMIN_ACCOUNT_SET_SAVING_STATUS:
			return {
				...state,
				savingAccountStatus: action.payload
			};

		case ADMIN_ACCOUNT_SET_DELETING_STATUS:
			return {
				...state,
				deletingAccountStatus: action.payload
			};

		case ADMIN_ACCOUNT_SET_DELETING_REPORT:
			return {
				...state,
				deletingAccountReport: action.payload
			};
		case ADMIN_ACCOUNT_SET_SAVING_REPORT:
			return {
				...state,
				savingAccountReport: action.payload
			};

		default:
			return state;
	}
}
