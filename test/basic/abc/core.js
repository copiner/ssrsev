
// the state of a todo app
var state = {
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
};


//reducer   dispatch an action
function todoApp(state={}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};


//we write smaller functions managing parts of the state:
//two reducers
function visibilityFilter(state, action) {
  //var state = state || 'SHOW_ALL';
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  } else {
    return state;
  }
};

//
function todos(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }]);
    case 'TOGGLE_TODO':
      // return state.map((todo, index, state) =>
      //   action.index === index ?
      //     { text: todo.text, completed: !todo.completed } :
      //     todo
      // )

      return state.map((todo, index, state) => {
          return action.index === index ?
          { text: todo.text, completed: !todo.completed } :
          todo
      })
    default:
      return state;
  }
};

//actions

//var action = { type: 'ADD_TODO', text: 'Go to swimming pool' };
var action = { type: 'TOGGLE_TODO', index: 0 }
//var action = { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }

var app = todoApp(state, action);
console.log(app);
