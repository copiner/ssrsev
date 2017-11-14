import { createStore } from 'redux'
import reducer from './combine/index'

let store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text: text
  }
}

store.dispatch(addTodo('Use Redux'))
// store.dispatch({
//   type: 'ADD_TODO',
//   text: 'Use Redux'
// })

console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }


//查看独立bindAction文件夹

//查看独立middle文件夹
