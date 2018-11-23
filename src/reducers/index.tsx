import {createBrowserHistory as createHistory} from 'history';
// import {createBrowserHistory} from 'history';
import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import {ReducerCategories} from './ReducerCategories';


export default combineReducers({
	ReducerFilms: ReducerCategories,
// @ts-ignore
	routing: routerReducer(createHistory),
});
