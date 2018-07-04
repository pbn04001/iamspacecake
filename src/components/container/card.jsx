import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Card = ({ children, className = '' }) => {
  return (
    <div className={classnames('sp-card', className)}>{children}</div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Card
