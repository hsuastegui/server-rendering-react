require('babel-register')({
  presets: ['react', 'latest'],
});
import path from 'path';
import request from 'request';
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './template';

const server = express();

//Serve static assets
server.use('/assets', express.static(path.join(__dirname, 'assets')));

//Simple APP
//import App from './components/app';
/*server.get('/', (req, res) => {
  let initialState = { title: 'From the Server' };
  request('http://jsonplaceholder.typicode.com/users', (error, response, body) => {
    initialState.users = JSON.parse(body);
    const appString = renderToString(<App {...initialState} />);
    res.send(template({
      body: appString,
      state: initialState
    }));
  });
});*/

//App with routes
// import { RouterContext, match } from 'react-router';
// import DataProvider from './DataProvider';
// import routes from './routes';
/*server.get('*', (req, res) => {
  match({ routes: routes, location: req.url}, (err, redirect, props) => {
      let initialState = { title: 'From the Server' };
      request('http://jsonplaceholder.typicode.com/users', (error, response, body) => {
        initialState.users = JSON.parse(body);
        const appHtml = renderToString(<DataProvider data={initialState}><RouterContext {...props} /></DataProvider>);
        res.send(template({
          body: appHtml,
          state: initialState
        }));
      });
  });
});*/

//App with redux and routes
import { RouterContext, match } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';
server.get('*', (req, res) => {
  match({ routes: routes, location: req.url}, (err, redirect, props) => {
    // Fetch remote data
    request('http://jsonplaceholder.typicode.com/users', (error, response, body) => {
      // Create an initial state
      const initialState = {users: JSON.parse(body)};
      // Create a new Redux store instance
      const store = createStore(reducers, initialState);
      // Grab the initial state from our Redux store
      const preloadedState = store.getState();
      // Render the component to a string
      const appHtml = renderToString(<Provider store={store}><RouterContext {...props} /></Provider>);
      res.send(template({
        body: appHtml,
        state: preloadedState
      }));
    });
  });
});

//Handle errors in routing
/*match({ routes: routes, location: req.url}, (err, redirect, props) => {
  if(err) {
    res.status(500).send(err.message);
  } else if(redirect) {
    res.redirect(302, redirect.pathname + redirect.search);
  } else if (props) {
    res.send('data');
  } else {
    res.status(404).send('Not Found');
  }
});*/

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
