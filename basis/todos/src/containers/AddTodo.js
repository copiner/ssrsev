import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'


let AddTodo = ({ dispatch }) => { //store.dispatch
  let myInput
  //console.log(dispatch);

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!myInput.value.trim()) {
          return
        } else {
          //console.log("myInput : "+ myInput.value);
          //console.log(addTodo(myInput.value));
        }
        dispatch(addTodo(myInput.value))
        myInput.value = ''
      }}>
        <input ref={node => {
          myInput = node;
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

AddTodo = connect()(AddTodo)
//这里写到一起了
//因为没有定义业务逻辑，这个容器组件(containers components)只是 UI 组件的一个单纯的包装层。

export default AddTodo
