//node环境下运行app.js

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

//actions
//var action = { type: 'ADD_TODO', text: 'Go to swimming pool' };
//var action = { type: 'TOGGLE_TODO', index: 0 }
var action = { type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }

//reducer
function todoApp(state, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};


var app = todoApp(state, action).todos;
var appV = todoApp(state, action).visibilityFilter;
console.log(app);
console.log(appV);



//we write smaller functions managing parts of the state:
//two reducers
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter;
  } else {
    return state;
  }
};

function todos(state, action) {
  switch (action.type) {
  case 'ADD_TODO':
    return state.concat([{ text: action.text, completed: false }]);
  case 'TOGGLE_TODO':
    return state.map((todo, index) =>
      action.index === index ?
        { text: todo.text, completed: !todo.completed } :
        todo
   )
  default:
    return state;
  }
};
