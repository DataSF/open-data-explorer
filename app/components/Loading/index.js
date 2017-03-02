import './_loading.scss'

import React, { Component, PropTypes } from 'react'
import IconLoading from './IconLoading'

class Loading extends Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false
    }
  }

  componentWillMount () {
    let { isFetching } = this.props
    if (isFetching) {
      setTimeout(() => { this.setState({ show: true }) }, 500)
    }
  }

  componentWillReceiveProps (nextProps) {
    let { isFetching } = nextProps
    this.setState({ show: false })
    if (isFetching) {
      setTimeout(() => { this.setState({ show: true }) }, 500)
    }
  }

  render () {
    let { isFetching } = this.props
    let { show } = this.state
    let style = this.props.style ? this.props.style : ''
    let classNames = `Loading-wrapper ${style}`

    console.log(show)
    return (
      <div>
        {isFetching
        ? <div className={classNames}>
          <IconLoading show={show} />
        </div> : this.props.children
      }
      </div>
    )
  }
}

Loading.propTypes = {
  isFetching: PropTypes.bool,
  height: PropTypes.number
}

export default Loading
