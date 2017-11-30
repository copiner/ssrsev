import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'

const App = ({todos, actions, mydispatch}) => (
  //console.log(todos.every(todo => todo.completed)),
  
  // console.log(todos.map(todo => ({
  //   ...todo,
  //   completed: "ll"
  // }))),

  //console.log(actions),
  //console.log(mydispatch),
  <div>
    <Header addTodo={actions.addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
)

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  todos: state.todos
})

// 这是应用 bindActionCreators 比较好的场景：
// 在子组件里，可以完全不知道 Redux 的存在。

const mapDispatchToProps = dispatch => ({
    mydispatch: dispatch,
    actions: bindActionCreators(TodoActions, dispatch)
})

// 一种可以替换 bindActionCreators 的做法是直接把 dispatch 函数
// 和 action creators 当作 props
// 传递给子组件
// return <MainSection todos={todos} dispatch={dispatch} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
