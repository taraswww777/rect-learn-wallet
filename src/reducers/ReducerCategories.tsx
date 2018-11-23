import {InterfaceAction} from 'src/types/InterfaceAction';

export const ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS = 'ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS';
export const ADMIN_CATEGORIES_SET_LIST = 'ADMIN_CATEGORIES_SET_LIST';

export const ADMIN_CATEGORIES_SET_ITEM = 'ADMIN_CATEGORIES_SET_ITEM';
export const ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS = 'ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS';

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
		default:
			return state;
	}
}
