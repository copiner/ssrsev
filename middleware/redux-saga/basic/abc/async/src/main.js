//import "babel-polyfill"
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
import rootSaga from './sagas'

const store = configureStore()
//console.log(store)
store.runSaga(rootSaga)

store.subscribe(() =>
  console.log(store.getState())
);


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

//log in or  sigh up
//StackOverflow
//Stack Overflow requires external JavaScript from another domain, which is blocked or failed to load.
