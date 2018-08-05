import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

import './styles.scss'

export const Button = ({
  buttonType,
  className,
  onClick,
  children,
}) => {
  return (
    <button // eslint-disable-line react/button-has-type
      type={buttonType}
      className={classnames('sp-button', className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  buttonType: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  buttonType: 'button',
  className: '',
  onClick: () => {},
}

export default Button
