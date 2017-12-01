### redux

#### actions
Actions are plain JavaScript objects. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants.
```
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
action creators
```
let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})
```
#### reducers
```
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

export default todos
```
combineReducers
```
const todoApp = combineReducers({
  todos,
  visibilityFilter
})
```
#### store
`the actions` that represent the facts about “what happened” and `the reducers` that update the state according to those actions.

The Store is the object that brings them together. The store has the following responsibilities:
1. Holds application state;
2. Allows access to state via `getState()`;
3. Allows state to be updated via `dispatch(action)`;
4. Registers listeners via `subscribe(listener)`;
5. Handles unregistering of listeners via the function returned by `subscribe(listener)`.

It's important to note that you'll only have a single store in a Redux application. When you want to split your data handling logic, you'll use `reducer composition` instead of many stores.

It's easy to create a store if you have a reducer:
```
let store = createStore(reducer);
```

#### Data Flow
Redux architecture revolves around a strict unidirectional data flow

The data lifecycle in any Redux app follows these 4 steps:

1.You call `store.dispatch(action)`.
An action is a plain object describing what happened. For example:
```
{ type: 'LIKE_ARTICLE', articleId: 42 }
{ type: 'FETCH_USER_SUCCESS', response: { id: 3, name: 'Mary' } }
{ type: 'ADD_TODO', text: 'Read the Redux docs.' }
```
You can call `store.dispatch(action)` from anywhere in your app, including components and XHR callbacks, or even at scheduled intervals.

2.The Redux store calls the reducer function you gave it

The store will pass two arguments to the reducer: the current state tree and the action. For example, in the todo app, the root reducer might receive something like this:
```
// The current application state (list of todos and chosen filter)
let previousState = {
  visibleTodoFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Read the docs.',
      complete: false
    }
  ]
}

// The action being performed (adding a todo)
let action = {
  type: 'ADD_TODO',
  text: 'Understand the flow.'
}

// Your reducer returns the next application state
let nextState = todoApp(previousState, action)
```

Note that a reducer is a pure function. It only computes the next state. It should be completely predictable: calling it with the same inputs many times should produce the same outputs. It shouldn't perform any side effects like API calls or router transitions. These should happen before an action is dispatched.

3.The root reducer may combine the output of multiple reducers into a single state tree

How you structure the root reducer is completely up to you. Redux ships with a combineReducers() helper function, useful for “splitting” the root reducer into separate functions that each manage one branch of the state tree.

Here's how` combineReducers() `works. Let's say you have two reducers, one for a list of todos, and another for the currently selected filter setting:
```
function todos(state = [], action) {
   // Somehow calculate it...
   return nextState
 }

 function visibleTodoFilter(state = 'SHOW_ALL', action) {
   // Somehow calculate it...
   return nextState
 }

 let todoApp = combineReducers({
   todos,
   visibleTodoFilter
 })
```

When you emit an action, todoApp returned by combineReducers will call both reducers:

```
let nextTodos = todos(state.todos, action)
 let nextVisibleTodoFilter = visibleTodoFilter(state.visibleTodoFilter, action)
```
It will then combine both sets of results into a single state tree:
```
return {
  todos: nextTodos,
  visibleTodoFilter: nextVisibleTodoFilter
}
```
4.The Redux store saves the complete state tree returned by the root reducer.

This new tree is now the next state of your app! Every listener registered with store.subscribe(listener) will now be invoked; listeners may call store.getState() to get the current state.

Now, the UI can be updated to reflect the new state. If you use bindings like React Redux, this is the point at which component.setState(newState) is called.

***

### react-redux

React bindings for Redux embrace the idea of separating `presentational and container components`. If you're not familiar with these terms, read about them first, and then come back

Most of the components we'll write will be presentational, but we'll need to generate a few container components to connect them to the Redux store

we will generate them using the `connect()` function provided by React Redux

### Designing Component Hierarchy

#### Designing Presentational Components

I see the following presentational components and their props emerge from this brief:

* `TodoList` is a list showing visible todos.
```
todos: Array is an array of todo items with { id, text, completed }
shape.onTodoClick(id: number) is a callback to invoke when a todo is clicked.
```
* `Todo` is a single todo item.
```
text: string is the text to show.
completed: boolean is whether todo should appear crossed out.
onClick() is a callback to invoke when a todo is clicked.
```
* `Link` is a link with a callback.
```
onClick() is a callback to invoke when link is clicked.
```
* `Footer `is where we let the user change currently visible todos.

* `App` is the root component that renders everything else.


They describe the look but don't know where the data comes from, or how to change it. They only render what's given to them. If you migrate from Redux to something else, you'll be able to keep all these components exactly the same. They have no dependency on Redux
#### Designing Container Components
We will also need some container components to connect the presentational components to Redux. For example, the presentational `TodoList` component needs a container like `VisibleTodoList` that subscribes to the Redux store and knows how to apply the current visibility filter. To change the visibility filter, we will provide a `FilterLink` container component that renders a `Link` that dispatches an appropriate action on click:

* `VisibleTodoList` filters the todos according to the current visibility filter and renders a TodoList.

* `FilterLink` gets the current visibility filter and renders a Link.
```
filter: string is the visibility filter it represents.
```

#### Designing Other Components
Sometimes it's hard to tell if some component should be a presentational component or a container. For example, sometimes form and function are really coupled together, such as in case of this tiny component:

* `AddTodo` is an input field with an “Add” button

Technically we could split it into two components but it might be too early at this stage. It's fine to mix presentation and logic in a component that is very small. As it grows, it will be more obvious how to split it, so we'll leave it mixed.

### Implementing Components
#### Implementing Presentational Components
These are all normal React components, so we won't examine them in detail. We write functional stateless components unless we need to use local state or the lifecycle methods. This doesn't mean that presentational components have to be functions—it's just easier to define them this way. If and when you need to add local state, lifecycle methods, or performance optimizations, you can convert them to classes.

`components/Todo.js`
```
import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={ {
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
```
...
#### Implementing Container Components
Now it's time to hook up those presentational components to Redux by creating some containers. Technically, a container component is just a React component that uses `store.subscribe()` to read a part of the Redux state tree and supply props to a presentational component it renders. You could write a container component by hand, but we suggest instead generating container components with the React Redux library's `connect()` function, which provides many useful optimizations to prevent unnecessary re-renders.

To use `connect()`, you need to define a special function called `mapStateToProps` that tells how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping. For example, `VisibleTodoList` needs to calculate `todos` to pass to the `TodoList`, so we define a function that filters the `state.todos `according to the `state.visibilityFilter`, and use it in its `mapStateToProps`:
```
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```
In addition to reading the state, container components can dispatch actions. In a similar fashion, you can define a function called `mapDispatchToProps()` that receives the `dispatch()` method and returns callback props that you want to inject into the presentational component. For example, we want the `VisibleTodoList` to inject a prop called `onTodoClick` into the `TodoList` component, and we want `onTodoClick` to dispatch a `TOGGLE_TODO` action:

```
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

Find the rest of the container components defined below:
```
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

```
#### Implementing Other Components
Recall as mentioned previously, both the presentation and logic for the AddTodo component are mixed into a single definition.
```
import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTodo(input.value))
          input.value = ''
        }}
      >
        <input
          ref={node => {
            input = node
          }}
        />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
```
### Tying the containers together within a component
`components/App.js`
```
import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
```
### Passing the Store
All container components need access to the Redux store so they can subscribe to it. One option would be to pass it as a prop to every container component. However it gets tedious, as you have to wire `store` even through presentational components just because they happen to render a container deep in the component tree.

The option we recommend is to use a special React Redux component called `<Provider>` to magically make the store available to all container components in the application without passing it explicitly. You only need to use it once when you render the root component:

```
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
