import axios from "axios";
import {BASE_URL_API} from "../config";
import {
	ADMIN_CATEGORIES_SET_ITEM,
	ADMIN_CATEGORIES_SET_LIST,
	ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS,
	ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS
} from "../reducers/ReducerCategories";
import {TypeDispatch} from "../types/InterfaceAction";
import {typeFunction} from "../types/Interfaces";

export type  typeFunctionLoadListCategories = typeFunction;
export type  typeFunctionLoadCategoryById = (categoryId: string) => void;

export function dispatchAdminCategories(dispatch: TypeDispatch) {
	return {
		loadListCategories: (): void => {
			const url = encodeURI(`${BASE_URL_API}/api/categories`);

			dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: false});

			axios.get(url)
				.then(response => dispatch({type: ADMIN_CATEGORIES_SET_LIST, payload: response.data}))
				.then(() => dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: true}))
				.catch(reason => {
					console.log('reason: ', reason);
					dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: true});
				});
		},

		loadCategoryById: (categoryId: string): void => {
			const url = encodeURI(`${BASE_URL_API}/api/getCategoryById/${categoryId}`);

			dispatch({type: ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS, payload: false});

			axios.get(url)
				.then(response => dispatch({type: ADMIN_CATEGORIES_SET_ITEM, payload: response.data}))
				.then(() => dispatch({type: ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS, payload: true}))
				.catch(reason => {
					console.log('reason: ', reason);
				});
		},

	};
}
