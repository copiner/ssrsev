import React from 'react'
import Todo from './Todo'

const TodoList = (props) => (
  console.log(props),
  <ul>
    {props.todos.map(item =>
      <Todo
        key={item.id}
        {...item}
        lclick={() => props.knock(item.id)}
      />
    )}
  </ul>
)


export default TodoList
