
import { createStore } from 'redux'

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text
  }
}

let store = createStore(todos, ['Use Redux'])

store.dispatch(addTodo('Read the docs'))

console.log(store.getState());

//store.subscribe(function () {
    //console.log(store.getState());
//});
