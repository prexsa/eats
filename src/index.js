import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers';
import App from './components/app';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Signout from './containers/auth/Signout';
import RequireAuth from './containers/auth/RequireAuth';
import Dashboard from './containers/Dashboard';
import Main from './containers/Main';

import { AUTH_USER, UNAUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

store.dispatch({ type: UNAUTH_USER });

if(token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/signout" component={Signout} />
        <Route path="/dashboard" component={RequireAuth(Dashboard)} />
      </Route>
    </Router>
  </MuiThemeProvider>
  </Provider>
  , document.querySelector('.container'));