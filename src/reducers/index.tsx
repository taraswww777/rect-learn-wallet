import {createBrowserHistory as createHistory} from 'history';
import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import ReducerAccounts from "./ReducerAccounts";
import ReducerCategories from './ReducerCategories';


export default combineReducers({
	ReducerAccounts,
	ReducerCategories,
// @ts-ignore
	routing: routerReducer(createHistory),
});
