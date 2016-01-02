import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

import Router, {Route} from 'react-router';
import App from './components/App';
import Results from './components/Results';

import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';

import {Provider} from 'react-redux';

import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

import {setState} from './action_creator';

import middleware from './middleware';

import io from 'socket.io-client';

const socket = io("http://localhost:8090");

const createStoreWithMiddleware = applyMiddleware(
  middleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);



socket.on('state', state => {
	store.dispatch(setState(state)); 
	console.log(state);
});

const routes = 
<Route component={App}>
	<Route path="/results" component={ResultsContainer} />
	<Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
	<Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);