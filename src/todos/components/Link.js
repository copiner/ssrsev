import React from 'react'
import PropTypes from 'prop-types'

const Link = (props) => {
  console.log(props)
  if (props.active) {
    return <span>{props.children}</span>
  }

  return (
    <a href=""
       onClick={e => {
         e.preventDefault()
         //onClick()
         props.knock(props.filter)
       }}
    >
      {props.children}
    </a>
  )
}

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  knock: PropTypes.func.isRequired
}

export default Link
