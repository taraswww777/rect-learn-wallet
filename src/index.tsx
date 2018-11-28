import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from './components/App';
import AdminAccounts from "./components/pages/AdminAccounts";
import AdminAccountsAdd from "./components/pages/AdminAccountsAdd";
import AdminAccountsEdit from "./components/pages/AdminAccountsEdit";
import AdminCategories from "./components/pages/AdminCategories";
import AdminCategoriesAdd from "./components/pages/AdminCategoriesAdd";
import AdminCategoriesEditor from "./components/pages/AdminCategoriesEditor";
import Dashboard from "./components/pages/Dashboard";
import DashboardAdmin from "./components/pages/DashboardAdmin";
import Reducers from "./reducers/index";
import registerServiceWorker from './registerServiceWorker';

const store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render((
	<Provider store={store}>
		<Router>
			<App>
				<Switch>
					<Route path={'/'} exact={true} component={Dashboard}/>
					<Route path={'/admin/categories/add/:id'} component={AdminCategoriesAdd}/>
					<Route path={'/admin/categories/add'} component={AdminCategoriesAdd}/>
					<Route path={'/admin/categories/edit/:id'} component={AdminCategoriesEditor}/>
					<Route path={'/admin/categories'} component={AdminCategories}/>
					<Route path={'/admin/accounts/edit/:id'} component={AdminAccountsEdit}/>
					<Route path={'/admin/accounts/add'} component={AdminAccountsAdd}/>
					<Route path={'/admin/accounts'} component={AdminAccounts}/>
					<Route path={'/admin'} component={DashboardAdmin}/>
				</Switch>
			</App>
		</Router>
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
