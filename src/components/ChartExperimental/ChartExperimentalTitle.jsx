import React, { Component } from 'react'
import { Glyphicon } from 'react-bootstrap'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import { toTitleCase } from '../../helpers'
// import titleize from 'titleize'
import {isColTypeTest} from '../../helpers'

class ChartExperimentalTitle extends Component {
  // /Builds the the chart title component for the chart

  buildA (columns, sumBy, rowLabel) {
    let a = pluralize(rowLabel)
    if (sumBy) {
      a = 'Sum of ' + columns[sumBy].name
    }
    return a
  }

  buildTitle (a, b, columns, groupBy, isNumericCol) {
    let title
    if (isNumericCol) {
      title = 'Distribution of ' + b + ' over all ' + a
    } else {
      title = a + ' by ' + b
    }

    if (groupBy) {
      title += ' and ' + columns[groupBy].name
    }

    title = toTitleCase(title)
    return title
  }

  render () {
    let {columns, sumBy, rowLabel, groupBy, selectedColumnDef, showHideModal} = this.props
    let a = this.buildA(columns, sumBy, rowLabel)
    let b = selectedColumnDef.name
    let isNumericCol = isColTypeTest(selectedColumnDef, 'number')
    let title = this.buildTitle(a, b, columns, groupBy, isNumericCol)
    return (
      <h2 className={'Chart__title'}>{title} <Glyphicon glyph='share-alt' onClick={showHideModal} /></h2>
    )
  }
}

ChartExperimentalTitle.propTypes = {
  columns: PropTypes.object,
  rowLabel: PropTypes.string,
  selectedColumnDef: PropTypes.object,
  groupBy: PropTypes.string,
  sumBy: PropTypes.string
}

export default ChartExperimentalTitle
