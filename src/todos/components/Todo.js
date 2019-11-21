import React from 'react'
import * as actionCreators from '../actions'
import { bindActionCreators } from 'redux'
import { connectAdvanced } from 'react-redux'
import PropTypes from 'prop-types'


const Todo = ({lclick,completed,text}) => (

  <li
    onClick={lclick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  lclick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}



// function selectorFactory(dispatch) {
//   let ownProps = {}
//   let result = {}
//
//   const actions = bindActionCreators(actionCreators, dispatch)
//   const addTodo = text => actions.addTodo(ownProps.userId, text)
//   console.log(actions)
//   console.log(addTodo)
//   return (nextState, nextOwnProps) => {
//     const todos = nextState.todos[nextOwnProps.userId]
//     const nextResult = { ...nextOwnProps, todos, addTodo }
//     ownProps = nextOwnProps
//     if (!shallowEqual(result, nextResult)) result = nextResult
//     return result
//   }
// }
//
// function shallowEqual(result, nextResult){
//   return true;
// }
// export default connectAdvanced(selectorFactory)(Todo)

export default Todo
