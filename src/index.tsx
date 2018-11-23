import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import AdminCategories from "./components/Admin/AdminCategories/AdminCategories";
import AdminCategoriesEditor from "./components/Admin/AdminCategories/AdminCategoriesEditor";
import App from './components/App/App';
import Dashboard from "./components/Dashboard/Dashboard";
import Reducers from "./reducers/index";
import registerServiceWorker from './registerServiceWorker';

const store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));

// noinspection RequiredAttributes
ReactDOM.render((
	<Provider store={store}>
		<Router>
			<App>
				<Switch>
					<Route path={'/'} exact={true} component={Dashboard}/>
					<Route path={'/admin/categories/editor/:id'} component={AdminCategoriesEditor}/>
					<Route path={'/admin/categories'} component={AdminCategories}/>
				</Switch>
			</App>
		</Router>
	</Provider>
), document.getElementById('root'));
registerServiceWorker();