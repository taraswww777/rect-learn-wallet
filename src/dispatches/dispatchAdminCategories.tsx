import axios from "axios";
import {BASE_URL_API} from "../config";
import {
	ADMIN_CATEGORIES_SET_ITEM,
	ADMIN_CATEGORIES_SET_LIST,
	ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS,
	ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, ADMIN_CATEGORIES_SET_LOAD_TREE_STATUS, ADMIN_CATEGORIES_SET_TREE, ADMIN_CATEGORY_SET_DELETING_REPORT,
	ADMIN_CATEGORY_SET_DELETING_STATUS, ADMIN_CATEGORY_SET_SAVING_REPORT,
	ADMIN_CATEGORY_SET_SAVING_STATUS,
	STATUS_DELETING_CATEGORY_COMPLETE,
	STATUS_DELETING_CATEGORY_IN_PROCESS,
	STATUS_LOADING_CATEGORY_ITEM_COMPLETE,
	STATUS_LOADING_CATEGORY_ITEM_IN_PROCESS,
	STATUS_LOADING_CATEGORY_LIST_COMPLETE,
	STATUS_LOADING_CATEGORY_LIST_IN_PROCESS, STATUS_LOADING_CATEGORY_TREE_COMPLETE, STATUS_LOADING_CATEGORY_TREE_IN_PROCESS,
	STATUS_SAVING_CATEGORY_COMPLETE,
	STATUS_SAVING_CATEGORY_IN_PROCESS,
} from "../reducers/ReducerCategories";
import {TypeDispatch} from "../types/InterfaceAction";
import {InterfaceCategory} from "../types/InterfaceCategory";
import {typeFunction} from "../types/Interfaces";

export type typeFunctionLoadListCategories = typeFunction;
export type typeFunctionLoadTreeCategories = typeFunction;
export type typeFunctionLoadCategoryById = (categoryId: number) => void;
export type typeFunctionSaveCategory = (category: InterfaceCategory) => void;
export type typeFunctionAddCategory = (category: InterfaceCategory) => void;
export type typeOnDelCatById = (category: InterfaceCategory) => void;

function loadTreeCategories(dispatch: TypeDispatch) {
	return () => {
		const url = encodeURI(`${BASE_URL_API}/api/getCategoriesTree`);

		dispatch({type: ADMIN_CATEGORIES_SET_LOAD_TREE_STATUS, payload: STATUS_LOADING_CATEGORY_TREE_IN_PROCESS});

		return axios.get(url)
			.then(response => dispatch({type: ADMIN_CATEGORIES_SET_TREE, payload: response.data}))
			.then(() => dispatch({type: ADMIN_CATEGORIES_SET_LOAD_TREE_STATUS, payload: STATUS_LOADING_CATEGORY_TREE_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
				dispatch({type: ADMIN_CATEGORIES_SET_LOAD_TREE_STATUS, payload: true});
			});
	}
}

function loadListCategories(dispatch: TypeDispatch) {
	return () => {
		const url = encodeURI(`${BASE_URL_API}/api/getCategoriesList`);

		dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_CATEGORY_LIST_IN_PROCESS});

		axios.get(url)
			.then(response => dispatch({type: ADMIN_CATEGORIES_SET_LIST, payload: response.data}))
			.then(() => dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_CATEGORY_LIST_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
				dispatch({type: ADMIN_CATEGORIES_SET_LOAD_LIST_STATUS, payload: STATUS_LOADING_CATEGORY_LIST_COMPLETE});
			});
	}
}

function onDelCatById(dispatch: TypeDispatch) {
	return (category: InterfaceCategory) => {
		const url = encodeURI(`${BASE_URL_API}/api/delCategoryById/${category.id}`);
		dispatch({type: ADMIN_CATEGORY_SET_DELETING_STATUS, payload: STATUS_DELETING_CATEGORY_IN_PROCESS});
		axios.get(url)
			.then(response => dispatch({type: ADMIN_CATEGORY_SET_DELETING_REPORT, payload: response.data}))
			.then(() => dispatch({type: ADMIN_CATEGORY_SET_DELETING_STATUS, payload: STATUS_DELETING_CATEGORY_COMPLETE}))
			.then(() => loadTreeCategories(dispatch)())
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function loadCategoryById(dispatch: TypeDispatch) {
	return (categoryId: number) => {
		const url = encodeURI(`${BASE_URL_API}/api/getCategoryById/${categoryId}`);

		dispatch({type: ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS, payload: STATUS_LOADING_CATEGORY_ITEM_IN_PROCESS});

		axios.get(url)
			.then(response => dispatch({type: ADMIN_CATEGORIES_SET_ITEM, payload: response.data}))
			.then(() => dispatch({type: ADMIN_CATEGORIES_SET_LOAD_ITEM_STATUS, payload: STATUS_LOADING_CATEGORY_ITEM_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function addCategory(dispatch: TypeDispatch) {
	return (category: InterfaceCategory) => {


		const url = encodeURI(`${BASE_URL_API}/api/addCategory`);

		const postParams = {
			name: category.name,
			order: category.order,
			parentId: category.parentId,
		};

		dispatch({type: ADMIN_CATEGORY_SET_SAVING_STATUS, payload: STATUS_SAVING_CATEGORY_IN_PROCESS});
		axios.post(url, postParams)
			.then(response => dispatch({type: ADMIN_CATEGORY_SET_SAVING_REPORT, payload: response.data}))
			.then(() => dispatch({type: ADMIN_CATEGORY_SET_SAVING_STATUS, payload: STATUS_SAVING_CATEGORY_COMPLETE}))
			.then(() => loadTreeCategories(dispatch)())
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

function saveCategory(dispatch: TypeDispatch) {
	return (category: InterfaceCategory) => {

		const url = encodeURI(`${BASE_URL_API}/api/saveCategoryById/${category.id}`);

		const postParams = {
			id: category.id,
			name: category.name,
			order: category.order,
			parentId: category.parentId,
		};

		dispatch({type: ADMIN_CATEGORY_SET_SAVING_STATUS, payload: STATUS_SAVING_CATEGORY_IN_PROCESS});
		axios.post(url, postParams)
			.then(response => dispatch({type: ADMIN_CATEGORY_SET_SAVING_REPORT, payload: response.data}))
			.then(() => loadTreeCategories(dispatch)())
			.then(() => dispatch({type: ADMIN_CATEGORY_SET_SAVING_STATUS, payload: STATUS_SAVING_CATEGORY_COMPLETE}))
			.catch(reason => {
				console.error('reason: ', reason);
			});
	}
}

export type fnAdminCategoriesAdd = (category: InterfaceCategory) => void;
export type fnAdminCategoriesUpdate = (category: InterfaceCategory) => void;
export type fnAdminCategoriesLoadList = typeFunction;
export type fnAdminCategoriesLoadTree = typeFunction;
export type fnAdminCategoriesLoadById = (categoryId: number) => void;
export type fnAdminCategoriesDeleteById = (category: InterfaceCategory) => void;

export interface InterfaceAdminCategoriesDispatcher {
	addCategory: fnAdminCategoriesAdd;
	loadCategoryById: fnAdminCategoriesLoadById;
	loadListCategories: fnAdminCategoriesLoadList;
	onDelCatById: fnAdminCategoriesDeleteById;
	saveCategory: fnAdminCategoriesUpdate;
	loadTreeCategories: fnAdminCategoriesLoadTree;
}

export default function dispatchAdminCategories(dispatch: TypeDispatch): InterfaceAdminCategoriesDispatcher {
	return {
		addCategory: addCategory(dispatch),
		loadCategoryById: loadCategoryById(dispatch),
		loadListCategories: loadListCategories(dispatch),
		loadTreeCategories: loadTreeCategories(dispatch),
		onDelCatById: onDelCatById(dispatch),
		saveCategory: saveCategory(dispatch)
	};
}
