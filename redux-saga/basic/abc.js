const state = {
  reactjs: {isFetching: true, items: []}
}

const action = {
  type: "TEST",
  reddit: "reactjs",
  posts: [1,2,3,4,5,6]
}


// let temp =  {
//   [action.reddit]: state[action.reddit]
// }

// console.log([action.reddit]);
// console.log(state[action.reddit]);
// console.log(temp);

let red = action.reddit;

let temp =  {
  red: state.red
}

console.log([action.reddit]);
console.log(state[action.reddit]);
console.log(temp);
