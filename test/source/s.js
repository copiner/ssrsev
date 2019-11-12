let store = {
    name:"store",
    dispatch:function(action){
	     console.log("store : ",action);
    }
}

//？？？
let dispatch = function (action) {
    console.log('logger : ', action);
    return function (action) {
      try {
        console.log('collect : ', action);
        return function(action){
           console.log("store : ",action);
        };
      } catch (err) {
        console.error('error', err);
      }
    };
};

store.dispatch = dispatch;

var action = {'name':'wdaonngg'}
store.dispatch(action);
