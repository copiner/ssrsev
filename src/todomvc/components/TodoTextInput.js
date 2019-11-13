import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || ''
  }

  handleSubmit = e => {
    //console.log(e.which);   //浏览器有3种按键事件——keydown，keypress和keyup，分别对应onkeydown、onkeypress和onkeyup3个事件句柄.
    //e有一个属性e.which指示哪个键被按下，给出该键的索引值（按键码）。
    //静态函数String.fromCharCode()可以把索引值（按键码）转化成该键对应的的字符。String.fromCharCode(e.which)
    const text = e.target.value.trim()
    if (e.which === 13) {   //enter键的 e.which === 13
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' }) //点击enter键后，input的value置为空。
      }
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value })
  }

  handleBlur = e => {
    //console.log(this.props.newTodo);  //onBlur(),用户离开焦点后执行动作。
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  // handleFocus = e => {
  //   //console.log("focus");  //onFocus(),用户获取焦点后执行动作。
  // }

  render() {
    // const obj = {
    //       edit: this.props.editing,
    //       'new-todo': this.props.newTodo
    //     }

    //console.log(obj);
    //console.log(classnames(obj));
    //其中函数classnames()返回以空格间隔的字符串,例如"new-todo header"，这里是input的样式类名。

    // const txt = this.props.text;
    // console.log(txt);

    // const txtTo = this.props.newTodo;  //true
    // console.log(txtTo);
    return (
      <input className={
        classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo //'new-todo'类名
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus = {true}
        value={this.state.text}
        // onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit} />
    )
  }
}
