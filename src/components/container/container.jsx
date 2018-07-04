import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { TYPE } from './constants'

const Container = ({ children, className = '', type = TYPE.PAGE }) => {
  return (
    <div className={classnames('sp-container', className, type)}>
      {type === TYPE.MAIN && <div className="sp-container-cover" />}
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.isPrototypeOf(TYPE),
}

export default Container
