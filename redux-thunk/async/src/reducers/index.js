//Reducers
import { combineReducers } from 'redux'
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

//reducers generate initial state
const selectedReddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

//dispatch(action) --> reducer(state, action) --> new state
const posts = (state = {isFetching: false, didInvalidate: false, items: []}, action) => {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS://actions --> receivePosts
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByReddit = (state = { }, action) => {
  //console.log(action);
  //console.log(state);
  switch (action.type) {
    case INVALIDATE_REDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
    //console.log([action.reddit])
    //console.log(state[action.reddit])
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
      }
    default:
      return state
  }
}

//const { selectedReddit, postsByReddit } = state

// const rootReducer = combineReducers({
//   postsByReddit:postsByReddit,
//   selectedReddit:selectedReddit
// })

//reducer(state, action) --> state

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
})

export default rootReducer
