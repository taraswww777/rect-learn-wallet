import {InterfaceAction} from 'src/types/InterfaceAction';

export const STATUS_LOADING_CATEGORY_ITEM_IN_PROCESS = 1;
export const STATUS_LOADING_CATEGORY_ITEM_COMPLETE = 2;

export const STATUS_LOADING_CATEGORY_LIST_IN_PROCESS = 3;
export const STATUS_LOADING_CATEGORY_LIST_COMPLETE = 4;

export const STATUS_SAVING_CATEGORY_IN_PROCESS = 5;
export const STATUS_SAVING_CATEGORY_COMPLETE = 6;

export const ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS = 'ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS';
export const ADMIN_CATEGORIES_SET_LIST = 'ADMIN_CATEGORIES_SET_LIST';

export const ADMIN_CATEGORIES_SET_ITEM = 'ADMIN_CATEGORIES_SET_ITEM';
export const ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS = 'ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS';

export const ADMIN_CATEGORY_SET_SAVING_STATUS = 'ADMIN_CATEGORY_SET_SAVING_STATUS';

const stateDefault = {
	categoryList: [],
};

export function ReducerCategories(state = stateDefault, action: InterfaceAction) {
	switch (action.type) {

		case ADMIN_CATEGORIES_SET_LIST:
			return {
				...state,
				categoryList: action.payload
			};
		case ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS:
			return {
				...state,
				loadCategoryListStatus: action.payload
			};

		case ADMIN_CATEGORIES_SET_ITEM:
			return {
				...state,
				categoryItem: action.payload
			};
		case ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS:
			return {
				...state,
				loadCategoryItemStatus: action.payload
			};

		case ADMIN_CATEGORY_SET_SAVING_STATUS:
			return {
				...state,
				savingCategoryStatus: action.payload
			};

		default:
			return state;
	}
}
