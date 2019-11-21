import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Counter from '../components/Counter'
import actions from '../actions';

//将state.count绑定到props的counter
/*
It is called every time the store state changes.
It receives the entire store state, and should return an object of data this component needs.

mapStateToProps should be defined as a function:
*/
const mapStateToProps = (state,ownProps) => {
  // const { todos } = state
  // return { todoList: todos.allIds }
  //console.log(ownProps);//id={1991}
    return {
        counter: state.count
    }
};

//将action的所有方法绑定到props上
const mapDispatchToProps = (dispatch, ownProps) => {
    //store.dispatch()发出 action
    return {
        increment: (...args) => dispatch(actions.increment(...args)),
        decrement: (...args) => dispatch(actions.decrement(...args))
    }
};

//To use bindActionCreators in our mapDispatchToProps function:
/*
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment, decrement }, dispatch)
}
*/
//mapDispatchToProps
//if you pass an object full of action creators instead of a function,
// connect will automatically call bindActionCreators for you internally.
//mapDispatchToProps can simply be
/*
const mapDispatchToProps = {
  increment,
  decrement
}
*/

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
//If you don't specify the second argument to connect(), your component will receive dispatch by default
//if you define your own mapDispatchToProps, the connected component will no longer receive dispatch.
export default connect(mapStateToProps, mapDispatchToProps)(Counter)

// AddTodo = connect()(AddTodo)
//
// export default AddTodo
