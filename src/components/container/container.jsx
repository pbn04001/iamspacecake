import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export const CONTAINER_TYPE = {
  TOP_LEFT: 'TOP_LEFT',
}

const Container = ({ children, className = '', type = '' }) => {
  const blockClass = 'sp-container'

  const typeClass = () => {
    switch (type) {
      case CONTAINER_TYPE.TOP_LEFT:
        return `${blockClass}--top-left`
      default:
        return null
    }
  }

  return (
    <div className={classnames(blockClass, typeClass(), className)}>
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
