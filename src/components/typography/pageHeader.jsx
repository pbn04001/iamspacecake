import React from 'react'
import PropTypes from 'prop-types'

const PageHeader = ({ children, className = '' }) => {
  return (
    <h2 className={className}>
      {children}
    </h2>
  )
}

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default PageHeader
