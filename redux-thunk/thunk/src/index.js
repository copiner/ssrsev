
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//Reducers
function count(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'REDUCER':
            return state - 1;
        default:
            return state;
    }
}
const store = createStore(count, applyMiddleware(thunk));

//action creator
function add() {
    return {
        type: 'ADD',
    }
}

function reducer() {
    return {
        type: 'REDUCER'
    }
}

// Redux Thunk middleware allows you to write action creators that return a function instead of an action.
// The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
// The inner function receives the store methods dispatch and getState as parameters.

//action creators that return a function
function addIfOdd() {
    return (dispatch, getState) => {
        const currentValue = getState();
        if (currentValue % 2 == 0) {
            return false;
        }
        dispatch(add())
    }
}

function addAsy(delay = 3000) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(add())
        }, delay)
    }
}

//获取当前值
let currentValue = store.getState();
//创建一个监听
store.subscribe(() => {
    const previosValue = currentValue;
    currentValue = store.getState();
    console.log('上一个值:', previosValue, '当前值:', currentValue)
});

//分发任务
store.dispatch(add());
store.dispatch(add());
store.dispatch(add());
store.dispatch(add());
store.dispatch(reducer());
store.dispatch(addIfOdd());
store.dispatch(addAsy());

store.dispatch(add());
store.dispatch(addIfOdd());
store.dispatch(addAsy());
//A thunk is a function that wraps an expression to delay its evaluation
// calculation of 1 + 2 is immediate
// x === 3
//let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
//let foo = () => 1 + 2;
