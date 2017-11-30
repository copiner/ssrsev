import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

//import reducer from './reducers'
//const store = createStore(reducer)

//1. export default
const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp

//or
// export default combineReducers({
//   todos,
//   visibilityFilter
// })

//import reducer from './reducers'

//2.export

//
// export const todoApp = combineReducers({
//   todos,
//   visibilityFilter
// })


//import { todoApp }  from './reducers'
