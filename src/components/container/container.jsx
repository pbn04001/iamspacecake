import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Container = ({ children, className = '' }) => {
  return (
    <div className={classnames('sp-container', className)}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
}

export default Container
