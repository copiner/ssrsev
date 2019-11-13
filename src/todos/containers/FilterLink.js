import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

//ownProps, Footer.js组件的props值 filter及children

//state, reducer/index.js
//初始值 {todos: [], visibilityFilter: "SHOW_ALL"}

const mapStateToProps = (state, ownProps) => ({
  state: state,
  ownProps: ownProps,
  active: ownProps.filter === state.visibilityFilter
})
//如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，
//这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick: () => {
//     dispatch(setVisibilityFilter(ownProps.filter))
//   }
// })

//如果传递的是一个对象，mapDispatchToProps写法修改如下
//同时link.js中要修改为onClick(ownProps.filter)
const mapDispatchToProps = {
  onClick: setVisibilityFilter
}


//containers components

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
