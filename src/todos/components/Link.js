import React from 'react'
import PropTypes from 'prop-types'

const Link = ({ state, ownProps, active, children, onClick }) => {
  console.log(state)
  console.log(ownProps)
  console.log(active)
  console.log(children)
  if (active) {
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
