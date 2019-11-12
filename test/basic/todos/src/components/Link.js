import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ state, ownProps, active, children, onClick }) => {
  //console.log(state)  //打印state
  //console.log(ownProps)
  if (active) {
    //console.log(active);  //at FilterLink.js
    console.log({children});   //Footer.js组件中children
    return <span>{children}</span>
  }

  return (
    <a href=""
       onClick={e => {
         e.preventDefault()
         //onClick()
         onClick(ownProps.filter)
       }}
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
