import { put, takeEvery} from 'redux-saga/effects'
import { delay } from 'redux-saga'

export function* incrementAsync() {
  yield delay(1000)
  yield put({type: 'INCREMENT'})
}

export default function* rootSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
