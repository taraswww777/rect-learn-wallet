import {InterfaceAction} from 'src/types/InterfaceAction';

// export const LOAD_STATUS = 'ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS';

export const ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS = 'ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS';
export const ADMIN_CATEGORIES_SET_LIST = 'ADMIN_CATEGORIES_SET_LIST';

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
		default:
			return state;
	}
}
