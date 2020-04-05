import React, { Component } from 'react';
import Header from './componentes/Header';
import Timeline from './componentes/Timeline';
import thunkMiddleware from 'redux-thunk';
import {timeline} from './reducers/timeline'
import {header} from './reducers/header'
import {createStore, applyMiddleware, combineReducers} from 'redux';

const reducers = combineReducers({timeline,header});
const reduxStore = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends Component {
  render() {
    return (
      <div id="root">
        <div className="main">
          <Header store={reduxStore}/>
          <Timeline login={this.props.params.login} store={reduxStore}/>
          </div>
      </div>
    );
  }
}

export default App;
