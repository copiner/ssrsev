
var initState = {
  todos: [ { id: 0, text: 'init', completed: false } ],
  visibilityFilter: 'SHOW_ALL'
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}


const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}



function combineReducers(reducers) {

  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    var hasChanged = false;
    var nextState = {};
    console.log("1------------------")
    // console.log(state);
    // console.log(action);
    console.log(finalReducers);
    console.log("------------------1")
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      console.log("2------------------")
      console.log(_key);
      console.log("------------------2")
      console.log("3------------------")
      console.log(reducer);
      console.log("------------------3")
      console.log("4------------------")
      console.log(state);
      console.log("------------------4")
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      console.log("5------------------")
      console.log(nextStateForKey);
      console.log("------------------5")
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

const rootReducer = combineReducers({
  todos,
  visibilityFilter
});

//console.log(rootReducer);
var createStore = require('./createStore');
var store = createStore(rootReducer,initState);

var sto = store.getState();
//console.log(sto);

let listener1 = () => {
  //console.log('listening---1')
}
let listener2 = () => {
  //console.log('listening---2')
}
store.subscribe(listener1);
var unsubscribe = store.subscribe(listener2);
//unsubscribe();

/*dispatch*/
let nextTodoId = 1
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

store.dispatch(addTodo('nice'));

var act = store.dispatch(toggleTodo(1));
//console.log(act);

var sto = store.getState();
//console.log(sto);
