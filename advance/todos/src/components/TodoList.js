import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({state, ownProps, todos, onTodoClick }) => (
  //console.log(state),
  //console.log(ownProps),
  //console.log(todos),
  //console.log(onTodoClick),
  <ul>
    {todos.map(toodoo =>
      <Todo
        key={toodoo.id}
        {...toodoo}
        //onClick={() => onTodoClick(toodoo.id)}  //dispatch(onTodoClick(toodoo.id))
        onClick={() => {console.log(onTodoClick(toodoo.id))}}
        //onClick={() => {onTodoClick(toodoo.id), console.log(toodoo.id)}}
      />
    )}
  </ul>
)

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList
