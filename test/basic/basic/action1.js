//Actions
//Action Creators
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

// dispatch(addTodo(text))
// dispatch(completeTodo(index))
const boundAddTodo = text => dispatch(addTodo(text))
const boundCompleteTodo = index => dispatch(completeTodo(index))

boundAddTodo(text)
boundCompleteTodo(index)
