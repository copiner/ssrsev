### Redux

actionCreator

bindActionCreator

components

containers components

reducer

#### redux 的基本用法

```
const reducer = (state = {count: 0}, action) => {
  switch (action.type){
    case 'INCREASE': return {count: state.count + 1};
    case 'DECREASE': return {count: state.count - 1};
    default: return state;
  }
}

const actions = {
  increase: () => ({type: 'INCREASE'}),
  decrease: () => ({type: 'DECREASE'})
}

const store = createStore(reducer);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch(actions.increase()) // {count: 1}
store.dispatch(actions.increase()) // {count: 2}
store.dispatch(actions.increase()) // {count: 3}
```

### 整体的流程
调用store.dispatch将action作为参数传入，同时用getState获取当前的状态树state并注册subscribe的listener监听state变化，再调用combineReducers并将获取的state和action传入。combineReducers会将传入的state和action传给所有reducer，reducer会根据state的key值获取与自己对应的state，并根据action的type返回新的state，触发state树的更新，我们调用subscribe监听到state发生变化后用getState获取新的state数据。


store是一个对象，它有四个主要的方法：
1、dispatch:
用于action的分发——在createStore中可以用middleware中间件对dispatch进行改造，比如当action传入dispatch会立即触发reducer，有些时候我们不希望它立即触发，而是等待异步操作完成之后再触发，这时候用redux-thunk对dispatch进行改造，以前只能传入一个对象，改造完成后可以传入一个函数，在这个函数里我们手动dispatch一个action对象，这个过程是可控的，就实现了异步。
2、subscribe：
监听state的变化——这个函数在store调用dispatch时会注册一个listener监听state变化，当我们需要知道state是否变化时可以调用，它返回一个函数，调用这个返回的函数可以注销监听。
let unsubscribe = store.subscribe(() => {console.log('state发生了变化')})
3、getState：
获取store中的state——当我们用action触发reducer改变了state时，需要再拿到新的state里的数据，毕竟数据才是我们想要的。getState主要在两个地方需要用到，一是在dispatch拿到action后store需要用它来获取state里的数据，并把这个数据传给reducer，这个过程是自动执行的，二是在我们利用subscribe监听到state发生变化后调用它来获取新的state数据，如果做到这一步，说明我们已经成功了。
4、replaceReducer:
替换reducer，改变state修改的逻辑。
store可以通过createStore()方法创建，接受三个参数，经过combineReducers合并的reducer和state的初始状态以及改变dispatch的中间件，后两个参数并不是必须的。store的主要作用是将action和reducer联系起来并改变state。
action是一个对象，其中type属性是必须的，同时可以传入一些数据。action可以用actionCreactor进行创造。dispatch就是把action对象发送出去。
reducer是一个函数，它接受一个state和一个action，根据action的type返回一个新的state。根据业务逻辑可以分为很多个reducer，然后通过combineReducers将它们合并，state树中有很多对象，每个state对象对应一个reducer，state对象的名字可以在合并时定义。
像这个样子：
const reducer = combineReducers({
     a: doSomethingWithA,
     b: processB,
     c: c
})
combineReducers其实也是一个reducer，它接受整个state和一个action，然后将整个state拆分发送给对应的reducer进行处理，所有的reducer会收到相同的action，不过它们会根据action的type进行判断，有这个type就进行处理然后返回新的state，没有就返回默认值，然后这些分散的state又会整合在一起返回一个新的state树。
接下来分析一下整体的流程，首先调用store.dispatch将action作为参数传入，同时用getState获取当前的状态树state并注册subscribe的listener监听state变化，再调用combineReducers并将获取的state和action传入。combineReducers会将传入的state和action传给所有reducer，reducer会根据state的key值获取与自己对应的state，并根据action的type返回新的state，触发state树的更新，我们调用subscribe监听到state发生变化后用getState获取新的state数据。
redux的state和react的state两者完全没有关系，除了名字一样。

### react-redux

#### connect

```
[mapStateToProps(state,[ownProps]): stateProps] (Function):
```
mapStateToProps必须是一个Function,作用是绑定state的指定值到props上

state: 监听Redux store的变化。任何时候只要 Redux store发生改变，mapStateToProps函数就会被调用,该回调函数必须返回一个纯对象，该对象会与相应展示组件的 props 合并。

ownProps: 该参数的值为传递到组件的 props，而且只要组件接收到新的props，mapStateToProps 也会被调用。

```
[mapDispatchToProps(dispatch,[ownProps]): dispatchProps] (Object or Function)
```
mapDispatchToProps可以是一个Function，也可以是Object,作用是绑定action创建函数到props上。

```
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
```
//or
```
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
}
```

如果传递的是一个对象，那么每个定义在该对象的函数都将被当作Redux action creator，而且这个对象会与 Redux store绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。

如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个函数通过 dispatch 函数与 action creator 以某种方式绑定在一起。

#### connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```
[mapStateToProps(state, [ownProps]): stateProps] (Function):
```
如果定义该参数，组件将会监听 Redux store 的变化。任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用。

```
[mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function):
```
如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。

如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()）。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。

#### provider
在ReactJS中的数据传递一般采用state和props，而props作为父组件向子组件的主要方式。在我们在调用Provider时，采用的是以下的方式：
```
const store = createStore(reducer)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
Provider源码实现:
```
export default class Provider extends Component {
  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return Children.only(this.props.children)
  }
}
```
上面的代码可以看出Provider是通过getChildContext的的方式传递给子组件的，并且我们也在connect源码中看到子组件取数据的过程:
```
constructor(props, context) {
    super(props, context)
    this.version = version
    this.store = props.store || context.store
    ...
}

```
