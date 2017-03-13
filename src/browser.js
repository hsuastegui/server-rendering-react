import React from 'react';
import { render } from 'react-dom';

//Simple APP
//import App from './components/app';
//render(<App {...window.__APP_INITIAL_STATE__} />, document.getElementById('root'));

//App with routes
//import { Router, browserHistory, match } from 'react-router';
//import routes from './routes';
// match({ history: browserHistory, routes }, (error, redirect, props) => {
//   render(<Router {...props} />, document.getElementById('root'));
// });

//App with redux and routes
import { Router, browserHistory, match } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import routes from './routes';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__
// Create Redux store with initial state
const store = createStore(
  rootReducer,
  preloadedState
);

//Async rendering
match({ history: browserHistory, routes }, (error, redirect, props) => {
  render(<Provider store={store}><Router {...props} /></Provider>, document.getElementById('root'));
});
