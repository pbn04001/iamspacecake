import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const PageHeader = ({ children, className = '' }) => {
  return (
    <h2 className={classnames('sp-page-header', className)}>
      {children}
    </h2>
  )
}

PageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default PageHeader
