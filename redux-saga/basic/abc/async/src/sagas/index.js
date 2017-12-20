
import { take, put, call, fork, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import * as actions from '../actions'
import { selectedRedditSelector, postsByRedditSelector } from '../reducers/selectors'

//dispatch
export function fetchPostsApi(reddit) {
    return fetch(`http://www.reddit.com/r/${reddit}.json` )
            .then(response => response.json() )
            .then(json => json.data.children.map(child => child.data) )
}

export function* fetchPosts(reddit) {
  yield put( actions.requestPosts(reddit) )
  //redux-saga put:
  //creates an Effect description that
  //instructs the middleware to dispatch an action to the Store
  const posts = yield call(fetchPostsApi, reddit)
  //console.log(posts);
  yield put( actions.receivePosts(reddit, posts) )
}

export function* invalidateReddit() {
  while (true) {
    const {reddit} = yield take(actions.INVALIDATE_REDDIT)
    yield call( fetchPosts, reddit )
  }
}

export function* nextRedditChange() {
  while(true) {
    const prevReddit = yield select(selectedRedditSelector)
    yield take(actions.SELECT_REDDIT)
    //redux-saga take(pattern):
    //Creates an Effect description that instructs the middleware to
    //wait for a specified action on the Store. The Generator is suspended
    // until an action that matches pattern is dispatched.
    const newReddit = yield select(selectedRedditSelector)
    const postsByReddit = yield select(postsByRedditSelector)
    if(prevReddit !== newReddit && !postsByReddit[newReddit])
      yield fork(fetchPosts, newReddit)
  }
}

export function* startup() {
  const selectedReddit = yield select(selectedRedditSelector)
  //console.log(selectedReddit);

  //redux-saga select(selector, ...args)
  //Creates an effect that instructs the middleware to
  //invoke the provided selector on the current Store's state
  yield fork(fetchPosts, selectedReddit)
}

export default function* root() {
  yield fork(startup)
  yield fork(nextRedditChange)
  yield fork(invalidateReddit)
}
