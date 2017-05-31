import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSelectedColumnDef } from '../reducers'
import { loadMetadata, loadColumnProps, loadQueryStateFromString } from '../actions'
import { ButtonToolbar, Button } from 'react-bootstrap'
import slugify from 'underscore.string/slugify'

import ChartCanvas from '../components/ChartExperimental/ChartExperimentalCanvas'
import ChartTitle from '../components/ChartExperimental/ChartExperimentalTitle'
import ChartSubTitle from '../components/ChartExperimental/ChartExperimentalSubTitle'
import Loading from '../components/Loading'
import Messages from '../components/Messages'

import { BASE_HREF } from '../constants/AppConstants'

const EmbedContextLinks = (props) => (
  <div className='EmbedContextLinks-wrapper'>
    <ButtonToolbar>
      <Button bsSize='small' bsStyle='primary' href={props.exploreLink} target='_blank'>Explore this data</Button>
    </ButtonToolbar>
  </div>
)

class Embed extends Component {
  componentWillMount () {
    let { queryString, onLoad, loadColumnProps, loadQueryStateFromString } = this.props

    onLoad()
      .then(() => {
        loadColumnProps()
      })
      .then(() => {
        setTimeout(() => {
          loadQueryStateFromString(queryString)
        }, 1000)
      })
  }

  render () {
    let { messages } = this.props
    let { columns, rowLabel, isFetching, selectedColumnDef, groupBy, sumBy, filters, datasetName, datasetLink, exploreLink } = this.props
    let { chartData, chartType, groupKeys } = this.props

    return (
      <div className='Embed'>
        <Loading isFetching={isFetching} type='centered'>
          <Messages messages={messages}>
            <div id='Embed-chartHeader' className='chartHeader'>
              <ChartTitle
                columns={columns}
                rowLabel={rowLabel}
                selectedColumnDef={selectedColumnDef}
                groupBy={groupBy}
                sumBy={sumBy} />
              <ChartSubTitle columns={columns} filters={filters} />
              <EmbedContextLinks datasetName={datasetName} datasetLink={datasetLink} exploreLink={exploreLink} />
            </div>
            <ChartCanvas
              embed
              chartData={chartData}
              chartType={chartType}
              groupKeys={groupKeys}
              filters={filters}
              rowLabel={rowLabel}
              selectedColumnDef={selectedColumnDef}
              groupBy={groupBy}
              sumBy={sumBy} />
          </Messages>
        </Loading>
      </div>
    )
  }
}

Embed.propTypes = {
  id: PropTypes.string,
  queryString: PropTypes.string,
  onLoad: PropTypes.func,
  loadColumnProps: PropTypes.func,
  loadQueryStateFromString: PropTypes.func,
  datasetName: PropTypes.string,
  datasetLink: PropTypes.string,
  exploreLink: PropTypes.string,
  messages: PropTypes.object
}

Embed.defaultProps = {
  isFetching: true
}

const mapStateToProps = (state, ownProps) => {
  const { query, columnProps, chart, metadata, messages } = state
  const id = ownProps.params.id
  const datasetPath = '/' + slugify(metadata.category) + '/' + slugify(metadata.name) + '/' + id
  const datasetLink = BASE_HREF + '/#' + datasetPath + '/chart_experimental?q=' + encodeURIComponent(ownProps.location.query.q)
  return {
    id,
    queryString: ownProps.location.query.q,
    chartType: chart.chartType,
    chartData: chart.chartData,
    groupKeys: chart.groupKeys,
    selectedColumn: query.selectedColumn,
    selectedColumnDef: getSelectedColumnDef(state),
    columns: columnProps.columns,
    groupBy: query.groupBy,
    sumBy: query.sumBy,
    dateBy: query.dateBy,
    rollupBy: query.rollupBy,
    filters: query.filters,
    rowLabel: metadata.rowLabel,
    isFetching: query.isFetching,
    datasetLink,
    exploreLink: datasetLink,
    datasetName: metadata.name,
    messages: messages
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      return dispatch(loadMetadata(ownProps.params.id))
    },
    loadColumnProps: () => {
      return dispatch(loadColumnProps())
    },
    loadQueryStateFromString: (q) => {
      return dispatch(loadQueryStateFromString(q))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Embed)
