import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import AdminCategories from "./components/Admin/AdminCategories";
import App from './components/App';
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
					<Route path={'/admin/categories'} component={AdminCategories}/>
				</Switch>
			</App>
		</Router>
	</Provider>
), document.getElementById('root'));
registerServiceWorker();
