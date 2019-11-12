import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const mapStateToProps = (state, ownProps) => ({
  state: state,
  ownProps: ownProps,
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
  //getVisibleTodos函数的定义在下面
})

//如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，
//其中所定义的方法名将作为属性名，合并到组件的 props 中。
const mapDispatchToProps = {
  onTodoClick: toggleTodo
}

const getVisibleTodos = (todos, filter) => {
  //console.log(todos);
  //console.log(filter);
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
