import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import App from './containers/App.js';

let store = createStore(reducer);

//console.log(store);
console.log(store.getState());//初始值{count: 0}

const root = document.createElement('div');
root.setAttribute("id","root");
document.body.appendChild(root);
let render = () => ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    root
);

export default render;
