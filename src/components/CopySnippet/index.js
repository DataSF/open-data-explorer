import './@CopySnippet.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, FormControl, Button, InputGroup } from 'react-bootstrap'
import CopyToClipboard from 'react-copy-to-clipboard'

class CopySnippet extends Component {
  constructor (props) {
    super(props)

    this.state = {
      copied: false
    }
  }

  handleFocus (ev) {
    ev.target.select()
  }

  handleCopy (ev) {
    this.setState({copied: true})
    setTimeout(() => {
      this.setState({copied: false})
    }, 2000)
  }

  render () {
    let { snippet, title, help } = this.props
    return (
      <div className='CopyEmbedLink-wrapper'>
        <h5>{title}</h5>
        <small className='text-muted'>{help}</small>
          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                readOnly
                value={snippet}
                onClick={this.handleFocus} />
              <InputGroup.Button>
                <CopyToClipboard text={snippet} onCopy={this.handleCopy.bind(this)}>
                  <Button bsStyle={'primary'} className={this.state.copied ? 'copied' : 'not-copied'}>
                    {this.state.copied ? 'Copied!' : 'Copy'}
                  </Button>
                </CopyToClipboard>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
      </div>
    )
  }
}

CopySnippet.propTypes = {
  snippet: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  help: PropTypes.string
}

export default CopySnippet
