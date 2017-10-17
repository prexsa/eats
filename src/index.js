import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './styles/app.scss';

import NavBar from './navigation-bar';

const App = () => (
  <Router>
    <Route path='/' component={NavBar} />
  </Router>
);

export default App;
ReactDOM.render(<App />, document.getElementById('root'));