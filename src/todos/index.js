import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

//state, reducer/index.js
//初始值 {todos: [], visibilityFilter: "SHOW_ALL"}

const store = createStore(reducer);

//console.log(store)

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
