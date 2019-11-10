import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './componentes/Login';
import {Router, Route, browserHistory} from 'react-router';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={Login} />
            <Route path="/timeline" component={App} />
        </Router>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
