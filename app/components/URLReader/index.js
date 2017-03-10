import React, { PropTypes, Component } from 'react'

class URLReader extends Component {

  componentDidMount () {
    let { param, urlQuery, processUrl, id } = this.props
    if (typeof urlQuery[param] !== 'undefined') {
      processUrl(id, urlQuery[param])
    }
  }

  render () {
    let { columns } = this.props
    return (
      <div>
        { typeof columns !== 'undefined'
          ? this.props.children : <h2>Loading</h2>
        }
      </div>
    )
  }
}

URLReader.propTypes = {
  processUrl: PropTypes.func,
  pathname: PropTypes.string,
  param: PropTypes.string,
  urlQuery: PropTypes.object,
  columns: PropTypes.object,
  id: PropTypes.string
}

export default URLReader
