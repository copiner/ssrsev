import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'

const { SHOW_ALL } = VisibilityFilters
//ES6解构赋值
//const SHOW_ALL = VisibilityFilters.SHOW_ALL

function visibilityFilter(state = SHOW_ALL, action) {
  console.log(state);
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  //console.log(state);
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index, state) => {
        if (index === action.index) {
          //console.log(todo);
          const ass = Object.assign({}, todo, {
            completed: !todo.completed
          });
          //console.log(ass);
          return ass;
        }
        return todo
      })
    default:
      return state
  }
}

//combineReducers触发 函数visibilityFilter与todos各运行2次
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
