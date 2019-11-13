import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './components/Counter'
import counter from './reducers'

console.log(createStore);

const store = createStore(counter)

const element = document.createElement('div');
element.setAttribute("id","root");
document.body.appendChild(element);

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  element
)

store.subscribe(render);

export default render;
