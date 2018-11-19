let store = {
    name:"store",
    dispatch:function(action){
	     console.log("store : ",action);
    }
}

let next = store.dispatch;

const logger = store => next => action => {
  console.log('logger : ', action);
  return next(action);
}

//"use strict";

// var logger = function logger(store) {
//   return function (next) {
//     return function (action) {
//       console.log('logger : ', action);
//       return next(action);
//     };
//   };
// };

const collectError = store => next => action => {
  try {
    console.log('collect : ', action);
    return next(action)
  } catch (err) {
    console.error('error', err)
  }
}

// var collectError = function collectError(store) {
//   return function (next) {
//     return function (action) {
//       try {
//         console.log('collect : ', action);
//         return next(action);
//       } catch (err) {
//         console.error('error', err);
//       }
//     };
//   };
// };

//how
function applyMiddleware(middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse();

  let dispatch = store.dispatch
  middlewares.forEach((middleware)=>{
      dispatch = middleware(store)(dispatch);
    }
  )
  return Object.assign({}, store, { dispatch })
}

//dispatch
// 'use strict';
// function (action) {
//     console.log('logger : ', action);
//     return function (action) {
//       try {
//         console.log('collect : ', action);
//         return function(action){
//            console.log("store : ",action);
//         };
//       } catch (err) {
//         console.error('error', err);
//       }
//     };
// };

const middlewares = [ logger, collectError ];

store = applyMiddleware(middlewares);

//equal ===

//let next = store.dispatch;
// let dispatch1 = logger(store)(next);
//
// let dispatch2 = collectError(store)(dispatch1);
//
// store.dispatch = dispatch2;

//run
var action = {'name':'wdaonngg'}
store.dispatch(action);
// dispatch2(action)
// dispatch1(action)
