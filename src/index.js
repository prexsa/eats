import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reducers from './reducers';
import App from './components/App';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Signout from './containers/auth/Signout';
import RequireAuth from './containers/auth/RequireAuth';

import '../style/style.scss';

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
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        {/*<Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/signout" component={Signout} />*/}
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));