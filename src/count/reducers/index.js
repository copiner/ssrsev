import { combineReducers } from 'redux'
import counter from './counter'

//使用redux的combineReducers方法将所有reducer打包起来
//combineReducers会将传入的state和action传给所有reducer,这里Reducers是counter
const rootReducer = combineReducers({
    count : counter  //这里自定义state的key为count
});

// console.log(counter);
// console.log(rootReducer);

export default rootReducer;
