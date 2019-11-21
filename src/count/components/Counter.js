import React, {Component} from 'react'

class Counter extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }
  render() {
      //从组件的props属性中导入二个方法和一个变量
      const {increment, decrement, counter} = this.props;
      //console.log(this.props.counter);
      //console.log(this.props.increment);
      //渲染组件，包括一个数字，二个按钮
      return (
          <p>
              Clicked: {counter} times
              {' '}
              <button onClick={increment}>+</button>
              {' '}
              <button onClick={decrement}>-</button>
              {' '}
          </p>
      )
  }
}

export default Counter
