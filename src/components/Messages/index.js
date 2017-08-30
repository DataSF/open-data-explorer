import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'
import './@Messages.css'

const Message = ({title, type, message, style}) => (
  type
  ? <Alert bsStyle={style} className={'Messages__message'}>
    <h4>{title}</h4>
    <p>{message}</p>
  </Alert> : false
)

class Messages extends Component {
  render () {
    let { messages } = this.props
    return (
      <div className='Messages__root'>
        <Message title={messages.title} type={messages.type} style={messages.style} message={messages.message} />
        { messages.showChildren !== false
          ? this.props.children 
          : null }
      </div>
    )
  }
}

Messages.propTypes = {
  messages: PropTypes.object.isRequired
}

export default Messages
