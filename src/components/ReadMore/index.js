import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ReadMore extends Component {
  constructor(...args) {
    super(...args)

    this.state = {
      expanded: false
    }

    this.toggleLines = this.toggleLines.bind(this)
  }

  toggleLines(event) {
    event.preventDefault()

    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {
    const { text, more, less, characters } = this.props

    const { expanded } = this.state

    let tooLong = text.length > characters
    let readMoreClass = tooLong ? 'ReadMore__truncated' : 'ReadMore__all'
    let readMoreText = !expanded && tooLong ? text.slice(0,characters) + '...' : text
    let toggle = !expanded ? more : less

    return (
      <div className={'ReadMore__root'}>
        <div className={readMoreClass}>
          {readMoreText}
          {tooLong && (
          <span> <a role='button' onClick={this.toggleLines}>{toggle}</a></span>
          )}
        </div>
      </div>
    );
  }
}

ReadMore.defaultProps = {
  text: '',
  characters: 300,
  more: 'Show more',
  less: 'Show less'
};

ReadMore.propTypes = {
  text: PropTypes.node.isRequired,
  lines: PropTypes.number
};

export default ReadMore