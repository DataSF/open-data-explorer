/* global Choose, When, Otherwise */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSelectedColumnDef, getGroupableColumns, getSelectableColumns, getSummableColumns, getSupportedChartTypes } from '../reducers'
import { showHideModal, selectColumn, groupBy, sumBy, addFilter, applyChartType, removeFilter, applyFilter, updateFilter, changeDateBy, loadQueryStateFromString, changeRollupBy } from '../actions'
import BlankChart from '../components/ChartExperimental/BlankChart'
import ConditionalOnSelect from '../components/ConditionalOnSelect'
import ChartExperimentalCanvas from '../components/ChartExperimental/ChartExperimentalCanvas'
import ChartExperimentalTitle from '../components/ChartExperimental/ChartExperimentalTitle'
import ChartExperimentalSubTitle from '../components/ChartExperimental/ChartExperimentalSubTitle'
import GroupOptions from '../components/Query/GroupOptions'
import FilterOptions from '../components/FilterChartOptions'
import SumOptions from '../components/Query/SumOptions'
import { Row, Col, Accordion } from 'react-bootstrap'
import DateToggle from '../components/Query/DateToggle'
import OtherDataToggle from '../components/Query/OtherDataToggle'
import ChartTypePicker from '../components/ChartTypePicker'
import Loading from '../components/Loading'
import Messages from '../components/Messages'
import { setDocumentTitle } from '../helpers'
import './@containers.css'

import ChartFieldSelector from '../containers/ChartFieldSelector'
import ModalShare from '../containers/ModalShare'

import { BASE_HREF } from '../constants/AppConstants'

class VizContainer extends Component {
  componentWillMount () {
    let { queryString } = this.props.props
    let { loadQueryStateFromString } = this.props.actions

    if (queryString) {
      setTimeout(() => {
        loadQueryStateFromString(queryString)
      }, 2000)
    }
  }

  render () {
    let { props, actions } = this.props
    let absoluteTop = {
      top: (props.topOffset) + 'px'
    }

    if (props.name) {
      setDocumentTitle(props.name + ' | Charts')
    }

    return (
      <Row>
        <ModalShare />
        <Col className={'VizContainer__config'} style={absoluteTop}>
          <Accordion>
            <ChartFieldSelector />
            <ConditionalOnSelect selectedColumn={props.selectedColumn}>
              <ChartTypePicker
                chartTypes={props.supportedChartTypes}
                chartType={props.chartType}
                onChange={actions.handleChartType} />
              <FilterOptions
                filters={props.filters}
                columns={props.columns}
                options={props.filterableColumns}
                handleAddFilter={actions.handleAddFilter}
                handleRemoveFilter={actions.handleRemoveFilter}
                applyFilter={actions.applyFilter}
                updateFilter={actions.updateFilter}
                dateBy={props.dateBy} />
              <Choose>
                <When condition={props.chartType !== 'histogram'}>
                  <GroupOptions columns={props.groupableColumns} selected={props.groupBy} onGroupBy={actions.handleGroupBy} />
                </When>
              </Choose>
              <SumOptions columns={props.summableColumns} selected={props.sumBy} onSumBy={actions.handleSumBy} />
            </ConditionalOnSelect>
          </Accordion>
        </Col>
        <Col className='VizContainer__stage' style={absoluteTop}>
            <ConditionalOnSelect selectedColumn={props.selectedColumn} displayBlank={<BlankChart />}>
              <div className='Chart__root'>
                <div className='Chart__header'>
                  <Row>
                    <Col md={9}>
                      <ChartExperimentalTitle
                        columns={props.columns}
                        rowLabel={props.rowLabel}
                        selectedColumnDef={props.selectedColumnDef}
                        groupBy={props.groupBy}
                        sumBy={props.sumBy}
                        showHideModal={actions.showHideModal} />
                      <ChartExperimentalSubTitle
                        columns={props.columns}
                        filters={props.filters}
                        chartData={props.chartData}
                        rollupBy={props.rollupBy} />
                    </Col>
                    <Col md={3}>
                      <Choose>
                        <When condition={props.selectedColumnDef && props.selectedColumnDef.type === 'date'}>
                          <DateToggle
                            dateBy={props.dateBy}
                            changeDateBy={actions.changeDateBy}
                            selectedColumnDef={props.selectedColumnDef} />
                        </When>
                        <Otherwise>
                          <OtherDataToggle
                            chartData={props.chartData}
                            rollupBy={props.rollupBy}
                            chartType={props.chartType}
                            changeRollupBy={actions.changeRollupBy}
                            selectedColumnDef={props.selectedColumnDef} />
                        </Otherwise>
                      </Choose>
                    </Col>
                  </Row>
                </div>
                <Loading isFetching={props.isFetching} type='centered' wraps='chart'>
                  <Messages messages={props.messages}>
                    <Choose>
                      <When condition={props.chartData}>
                        <ChartExperimentalCanvas
                          chartData={props.chartData || []}
                          chartType={props.chartType}
                          dateBy={props.dateBy}
                          rollupBy={props.rollupBy}
                          groupKeys={props.groupKeys}
                          filters={props.filters}
                          rowLabel={props.rowLabel}
                          selectedColumnDef={props.selectedColumnDef}
                          groupBy={props.groupBy}
                          sumBy={props.sumBy}
                          isFetching={props.isFetching} />
                      </When>
                    </Choose>
                  </Messages>
                </Loading>
              </div>
            </ConditionalOnSelect>
        </Col>
      </Row>
    )
  }
}

VizContainer.propTypes = {
  props: PropTypes.shape({
    isFetching: PropTypes.bool,
    chartType: PropTypes.string,
    chartData: PropTypes.array,
    groupKeys: PropTypes.array,
    selectedColumn: PropTypes.string,
    selectedColumnDef: PropTypes.object,
    columns: PropTypes.object,
    groupBy: PropTypes.string,
    sumBy: PropTypes.string,
    dateBy: PropTypes.string,
    rollupBy: PropTypes.string,
    filters: PropTypes.object,
    rowLabel: PropTypes.string,
    groupableColumns: PropTypes.array,
    selectableColumns: PropTypes.array,
    frontMatterHeight: PropTypes.number
  })
}

const mapStateToProps = (state, ownProps) => {
  const { metadata, chart, columnProps, query, messages } = state
  const id = ownProps.params.id
  let queryState = Object.assign({}, query)
  delete queryState.isFetching
  const encodedJSON = encodeURIComponent(JSON.stringify(queryState))
  const embedLink = BASE_HREF + '/#/e/' + id + '?q=' + encodedJSON
  const embedCode = '<iframe src="' + embedLink + '" width="100%" height="400" allowfullscreen frameborder="0"></iframe>'
  return {
    props: {
      name: ownProps.name,
      frontMatterHeight: ownProps.frontMatterHeight,
      topOffset: ownProps.topOffset,
      id,
      embedCode,
      messages,
      supportedChartTypes: getSupportedChartTypes(state),
      queryString: ownProps.location.query.q,
      chartType: chart.chartType,
      chartData: chart.chartData,
      groupKeys: chart.groupKeys,
      selectedColumn: query.selectedColumn,
      selectedColumnDef: getSelectedColumnDef(state),
      columns: columnProps.columns,
      isFetching: query.isFetching,
      groupBy: query.groupBy,
      sumBy: query.sumBy,
      dateBy: query.dateBy || 'year',
      rollupBy: query.rollupBy,
      filters: query.filters,
      rowLabel: metadata.rowLabel,
      summableColumns: getSummableColumns(state),
      groupableColumns: getGroupableColumns(state),
      selectableColumns: getSelectableColumns(state),
      filterableColumns: getSelectableColumns(state, false, true)
    }
  }
}

// Note: if we split up action creators, we can probably simplify the mapping, but for now this works
// https://github.com/reactjs/react-redux/blob/master/docs/api.md
// https://reactcommunity.org/redux/docs/api/bindActionCreators.html

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: {
      selectColumn: (key) => {
        return dispatch(selectColumn(key))
      },
      handleGroupBy: (key) => {
        return dispatch(groupBy(key))
      },
      handleSumBy: (key) => {
        return dispatch(sumBy(key))
      },
      handleAddFilter: (key) => {
        return dispatch(addFilter(key))
      },
      handleRemoveFilter: (key) => {
        return dispatch(removeFilter(key))
      },
      applyFilter: (key, options) => {
        return dispatch(applyFilter(key, options))
      },
      updateFilter: (key, options) => {
        return dispatch(updateFilter(key, options))
      },
      changeDateBy: (dateBy) => {
        return dispatch(changeDateBy(dateBy))
      },
      changeRollupBy: (rollupBy) => {
        return dispatch(changeRollupBy(rollupBy))
      },
      handleChartType: (chartType) => {
        return dispatch(applyChartType(chartType))
      },
      loadQueryStateFromString: (q) => {
        return dispatch(loadQueryStateFromString(q))
      },
      showHideModal: () => {
        return dispatch(showHideModal('share'))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VizContainer)
