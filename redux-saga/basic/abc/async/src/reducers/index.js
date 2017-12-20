//reducers
import { combineReducers } from 'redux'
import {
  SELECT_REDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions'

function selectedReddit(state = 'reactjs', action) {
  //console.log(action);
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function posts(state = {isFetching: false, items: []}, action) {
  //console.log(action);
  switch (action.type) {
    case REQUEST_POSTS:
      return { ...state, isFetching: true }

    case RECEIVE_POSTS:
      return { ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

function postsByReddit(state = { }, action) {
  //console.log(action);
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      return { ...state,
        [action.reddit]: posts(state[action.reddit], action)//a demo below this page
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
})
// const rootReducer = combineReducers({
//   'postsByReddit': postsByReddit,
//   'selectedReddit': selectedReddit
// })

export default rootReducer


//a demo
/**************************
const state = {
  reactjs: {isFetching: true, items: []}
}

const action = {
  type: "TEST",
  reddit: "reactjs",
  posts: [1,2,3,4,5,6]
}


let temp =  {
  [action.reddit]: state[action.reddit]
}

console.log([action.reddit]);
console.log(state[action.reddit]);
console.log(temp);

let red = action.reddit;

let temp =  {
  red: state.red
}

console.log([action.reddit]);
console.log(state[action.reddit]);
console.log(temp);

**************************/
