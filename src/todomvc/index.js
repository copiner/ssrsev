import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import './index.css'

const store = createStore(reducer)

store.subscribe(function () {
    //console.log(store.getState());
});

const root = document.createElement('div');
root.setAttribute("id","root");
document.body.appendChild(root);

let fresh = () => render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
)

export default fresh;
