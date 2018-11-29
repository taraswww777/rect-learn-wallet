import {createBrowserHistory as createHistory} from 'history';
import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import ReducerAccounts from "./ReducerAccounts";
import ReducerCategories from './ReducerCategories';
import ReducerRecords from "./ReducerRecords";


export default combineReducers({
	ReducerAccounts,
	ReducerCategories,
	ReducerRecords,
// @ts-ignore
	routing: routerReducer(createHistory),
});
