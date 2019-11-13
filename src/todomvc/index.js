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

let fresh = (element) => render(
  <Provider store={store}>
    <App />
  </Provider>,
  element
)

export default fresh;
