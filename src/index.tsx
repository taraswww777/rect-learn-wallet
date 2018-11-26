import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from './components/App/App';
import AdminCategories from "./components/pages/AdminCategories";
import AdminCategoriesEditor from "./components/pages/AdminCategoriesEditor";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import DashboardAdmin from "./components/pages/DashboardAdmin/DashboardAdmin";
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
					<Route path={'/admin/categories/add/:id'} component={AdminCategoriesEditor}/>
					<Route path={'/admin/categories/add'} component={AdminCategoriesEditor}/>
					<Route path={'/admin/categories/editor/:id'} component={AdminCategoriesEditor}/>
					<Route path={'/admin/categories'} component={AdminCategories}/>
					<Route path={'/admin'} component={DashboardAdmin}/>
				</Switch>
			</App>
		</Router>
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
