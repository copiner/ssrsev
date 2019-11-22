var _objectSpread2 = require('./help/helper');
var compose = require('./help/compose');
var createStore = require('./createStore');
var thunk = require('./thunk');

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {//enhancer
    return function () {
      var store = createStore.apply(void 0, arguments);//arguments reducer, preloadedState

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. '
          + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        console.log(middleware(middlewareAPI))
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

//enhancer(createStore)(reducer, preloadedState)

const reducer = (state = [], action) => {
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

const middleware = [ thunk ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
