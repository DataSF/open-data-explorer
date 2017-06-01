import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

const Message = ({title, type, message}) => (
  type
  ? <Alert bsStyle='danger'>
    <h4>{title}</h4>
    <p>{message}</p>
  </Alert> : false
)

class Messages extends Component {
  render () {
    let { messages } = this.props
    let title = messages.server ? 'Server Error' : 'Application Error'
    return (
      <div className='Messages-wrapper'>
        <Message title={title} type={messages.type} message={messages.message} />
        {(messages.type !== 'error' && this.props.children)
          ? this.props.children : false }
      </div>
    )
  }
}

Messages.propTypes = {
  messages: PropTypes.object.isRequired
}

export default Messages
