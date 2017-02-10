import React, { Component } from 'react'
import pluralize from 'pluralize'
// import { toTitleCase } from '../../helpers'
import titleize from 'titleize'

class ChartExperimentalTitle extends Component {
  // /Builds the the chart title component for the chart

  buildA (columns, sumBy, rowLabel) {
    let a = pluralize(rowLabel)
    if (sumBy) {
      a = 'Sum of ' + columns[sumBy].name
    }
    return a
  }

  buildTitle (a, b, columns, groupBy) {
    let title = a + ' by ' + b

    if (groupBy) {
      title += ' and ' + columns[groupBy].name
    }
    title = titleize(title)
    return title
  }

  render () {
    let {columns, sumBy, rowLabel, groupBy, selectedColumnDef} = this.props
    let a = this.buildA(columns, sumBy, rowLabel)
    let b = selectedColumnDef.name
    let title = this.buildTitle(a, b, columns, groupBy)
    return (
      <h2 className={'chartTitle'}>{title}</h2>
    )
  }
}

ChartExperimentalTitle.propTypes = {
  columns: React.PropTypes.object,
  rowLabel: React.PropTypes.string,
  selectedColumnDef: React.PropTypes.object,
  groupBy: React.PropTypes.string,
  sumBy: React.PropTypes.string
}

export default ChartExperimentalTitle
