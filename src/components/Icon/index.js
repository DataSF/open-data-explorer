import React, { Component } from 'react'
import './@Icon.css'

class Icon extends Component {

  render () {
    let { label, className, onClick, otherComponents, onClickParams } = this.props
    if (className) {
      label = label + ' ' + className
    }
    if (onClick) {
      onClick = onClick.bind(this, onClickParams)
    }
    return (
      <span
        onClick={onClick}
        className={label}
        aria-hidden='true'>
        {otherComponents}
      </span>

    )
  }
}

// Icon.propTypes = {
  // otherComponents: React.PropTypes.array,
//  onClickFxn: React.PropTypes.func,
//  label: React.PropTypes.string,
//  className: React.PropTypes.string
//}
export default Icon
