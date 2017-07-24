import './@Loading.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    let type = this.props.type ? this.props.type : ''
    let classNames = `Loading-wrapper ${type}`
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
