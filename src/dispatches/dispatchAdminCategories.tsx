import axios from "axios";
import {BASE_URL_API} from "../config";
import {
	ADMIN_CATEGORIES_SET_ITEM,
	ADMIN_CATEGORIES_SET_LIST,
	ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS,
	ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, ADMIN_CATEGORY_SET_DELETING_REPORT,
	ADMIN_CATEGORY_SET_DELETING_STATUS,
	ADMIN_CATEGORY_SET_SAVING_STATUS,
	STATUS_DELETING_CATEGORY_COMPLETE,
	STATUS_DELETING_CATEGORY_IN_PROCESS,
	// ADMIN_CATEGORY_SET_SAVING_STATUS,
	STATUS_LOADING_CATEGORY_ITEM_COMPLETE,
	STATUS_LOADING_CATEGORY_ITEM_IN_PROCESS,
	STATUS_LOADING_CATEGORY_LIST_COMPLETE,
	STATUS_LOADING_CATEGORY_LIST_IN_PROCESS,
	STATUS_SAVING_CATEGORY_COMPLETE,
	STATUS_SAVING_CATEGORY_IN_PROCESS,
	// STATUS_SAVING_CATEGORY_COMPLETE, STATUS_SAVING_CATEGORY_IN_PROCESS,
} from "../reducers/ReducerCategories";
import {TypeDispatch} from "../types/InterfaceAction";
import {InterfaceCategory} from "../types/InterfaceCategory";
import {typeFunction} from "../types/Interfaces";

export type typeFunctionLoadListCategories = typeFunction;
export type typeFunctionLoadCategoryById = (categoryId: string) => void;
export type typeFunctionSaveCategory = (category: InterfaceCategory) => void;
export type typeFunctionAddCategory = (category: InterfaceCategory) => void;
export type typeOnDelCatById = (category: InterfaceCategory) => void;

export function dispatchAdminCategories(dispatch: TypeDispatch) {
	return {
		loadListCategories: (): void => {
			const url = encodeURI(`${BASE_URL_API}/api/getCategoriesTree`);

			dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_CATEGORY_LIST_IN_PROCESS});

			axios.get(url)
				.then(response => dispatch({type: ADMIN_CATEGORIES_SET_LIST, payload: response.data}))
				.then(() => dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_CATEGORY_LIST_COMPLETE}))
				.catch(reason => {
					console.log('reason: ', reason);
					dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: true});
				});
		},

		loadCategoryById: (categoryId: string): void => {
			const url = encodeURI(`${BASE_URL_API}/api/getCategoryById/${categoryId}`);

			dispatch({type: ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS, payload: STATUS_LOADING_CATEGORY_ITEM_IN_PROCESS});

			axios.get(url)
				.then(response => dispatch({type: ADMIN_CATEGORIES_SET_ITEM, payload: response.data}))
				.then(() => dispatch({type: ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS, payload: STATUS_LOADING_CATEGORY_ITEM_COMPLETE}))
				.catch(reason => {
					console.log('reason: ', reason);
				});
		},

		saveCategory(category: InterfaceCategory): void {

			const url = encodeURI(`${BASE_URL_API}/api/saveCategoryById/${category.id}`);

			const postParams = {
				id: category.id,
				name: category.name,
				order: category.order,
				parentId: category.parentId,
			};

			dispatch({type: ADMIN_CATEGORY_SET_SAVING_STATUS, payload: STATUS_SAVING_CATEGORY_IN_PROCESS});
			axios.post(url, postParams)
				.then(response => {
					console.log('response.data:', response.data);
				})
				.then(() => dispatch({type: ADMIN_CATEGORY_SET_SAVING_STATUS, payload: STATUS_SAVING_CATEGORY_COMPLETE}))
				.catch(reason => {
					console.log('reason: ', reason);
				});
		},

		addCategory(category: InterfaceCategory): void {
			const url = encodeURI(`${BASE_URL_API}/api/addCategory`);

			const postParams = {
				name: category.name,
				order: category.order,
				parentId: category.parentId,
			};

			dispatch({type: ADMIN_CATEGORY_SET_SAVING_STATUS, payload: STATUS_SAVING_CATEGORY_IN_PROCESS});
			axios.post(url, postParams)
				.then(response => {
					console.log('response.data:', response.data);
				})
				.then(() => dispatch({type: ADMIN_CATEGORY_SET_SAVING_STATUS, payload: STATUS_SAVING_CATEGORY_COMPLETE}))
				.catch(reason => {
					console.log('reason: ', reason);
				});
		},

		onDelCatById(category: InterfaceCategory): void {
			const url = encodeURI(`${BASE_URL_API}/api/delCategoryById/${category.id}`);
			dispatch({type: ADMIN_CATEGORY_SET_DELETING_STATUS, payload: STATUS_DELETING_CATEGORY_IN_PROCESS});
			axios.get(url)
				.then(response => dispatch({type: ADMIN_CATEGORY_SET_DELETING_REPORT, payload: response.data}))
				.then(() => dispatch({type: ADMIN_CATEGORY_SET_DELETING_STATUS, payload: STATUS_DELETING_CATEGORY_COMPLETE}))
				.catch(reason => {
					console.log('reason: ', reason);
				});
		}
	};
}
