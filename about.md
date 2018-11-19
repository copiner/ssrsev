
### Redux中间件

在Redux中，所有的数据（比如state）被保存在一个被称为store的容器中 → 在一个应用程序中只能有一个。store本质上是一个状态树，保存了所有对象的状态。任何UI组件都可以直接从store访问特定对象的状态。要通过本地或远程组件更改状态，需要分发一个action。分发在这里意味着将可执行信息发送到store。当一个store接收到一个action，它将把这个action代理给相关的reducer。reducer是一个纯函数，它可以查看之前的状态，执行一个action并且返回一个新的状态。

### 中间件实现原理

```javascript
const store = {
    name:"store",
    dispatch:(action) => {
	     console.log("store : ",action);
    }
}

let next = store.dispatch;


const logger = store => next => action => {
  console.log('logger : ', action);
  return next(action)
}

'use strict';
//
// var logger = function logger(store) {
//    return function (next) {
//      return function (action) {
//        console.log('dispatching', action);
//        return next(action);
//      };
//    };
//  };

const applyMiddleware = (middleware) => {
    let next = store.dispatch;
    store.dispatch = middleware(store)(next);
}

applyMiddleware(logger);

var action = {'name':'wdaonngg'}
store.dispatch(action);
```


```javascript
const store = {
    name:"store",
    dispatch:function(action){
	     console.log("store : ",action);
    }
}

let next = store.dispatch;

const logger = store => next => action => {
  console.log('logger : ', action);
  return next(action)
}

const collectError = store => next => action => {
  try {
    console.log('collect : ', action);
    return next(action)
  } catch (err) {
    console.error('error', err)
  }
}

//how
function applyMiddleware(middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )
  return Object.assign({}, store, { dispatch })
}

const middlewares = [ logger, collectError ];

//applyMiddleware(...middlewares);

//equal ===

//let next = store.dispatch;
let dispatch1 = logger(store)(next);

let dispatch2 = collectError(store)(dispatch1);

store.dispatch = dispatch2;


//run
var action = {'name':'wdaonngg'}
store.dispatch(action);
// dispatch2(action)
// dispatch1(action)


```

上面的middleware(store)(dispatch) 就相当于是 const logger = store => next => {}，这就是构造后的dispatch，继续向下传递。这里middlewares.reverse()，进行数组反转的原因，是最后构造的dispatch，实际上是最先执行的。因为在applyMiddleware串联的时候，每个中间件只是返回一个新的dispatch函数给下一个中间件，实际上这个dispatch并不会执行。只有当我们在程序中通过store.dispatch(action)，真正派发的时候，才会执行。而此时的dispatch是最后一个中间件返回的包装函数
