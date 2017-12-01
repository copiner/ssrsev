import React from 'react'
import PropTypes from 'prop-types'

//completed, text这三个参数在todos里面
//onClick为props
const Todo = ({onClick, completed, text }) => (
  //console.log(completed),
  //console.log(text),
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
