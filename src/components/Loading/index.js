import './@Loading.css'

import React, { Component, PropTypes } from 'react'
import IconLoading from './IconLoading'

class Loading extends Component {
  constructor (props) {
    super(props)

    this.state = {
      timer: null,
      show: false
    }
  }

  componentDidMount () {
    let timer = null
    let {isFetching} = this.props
    if (isFetching) {
      timer = setTimeout(() => { this.setState({ show: true }) }, 750)
      this.setState({timer})
    }
  }

  componentWillUnmount () {
    clearTimeout(this.state.timer)
  }

  componentWillReceiveProps (nextProps) {
    clearTimeout(this.state.timer)
    let timer = null
    let {isFetching} = nextProps
    this.setState({ show: false, timer })

    if (isFetching) {
      timer = setTimeout(() => { this.setState({ show: true }) }, 750)
      this.setState({timer})
    }
  }

  render () {
    // let { isFetching } = this.props
    let { show } = this.state
    console.log(show)
    let style = this.props.style ? this.props.style : ''
    let classNames = `Loading-wrapper ${style}`
    return (
      <div className={classNames}>
        <IconLoading show={show} />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Loading.propTypes = {
  isFetching: PropTypes.bool,
  height: PropTypes.number
}

export default Loading

// <IconLoading show={show} />
