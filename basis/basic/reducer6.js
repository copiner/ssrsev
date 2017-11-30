const reducer = combineReducers({
  a: doSomethingWithA,
  b: processB,
  c: c
})

// function reducer(state = {}, action) {
//   return {
//     a: doSomethingWithA(state.a, action),
//     b: processB(state.b, action),
//     c: c(state.c, action)
//   }
// }
