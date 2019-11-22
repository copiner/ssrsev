import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getAllProducts } from './actions'
import App from './containers/App'

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  //middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

store.dispatch(getAllProducts())

const root = document.createElement('div');
root.setAttribute("id","root");
document.body.appendChild(root);

let cart = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)

export default cart;
