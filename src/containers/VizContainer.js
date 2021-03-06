/* global Choose, When, Otherwise */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSelectedColumnDef, getGroupableColumns, getSelectableColumns, getSummableColumns, getSupportedChartTypes, isGroupByz, setXAxisTickInterval, explodeFrequencies, getFilterableColumns, setGroupByColorScale } from '../reducers'
import { showHideModal, selectColumn, groupBy, sumBy, addFilter, applyChartType, removeFilter, applyFilter, updateFilter, changeDateBy, loadQueryStateFromString, changeRollupBy, changeChartColor } from '../actions'
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
import { setDocumentTitle, isColTypeTest, roundAxisZeros } from '../helpers'
import './@containers.css'
import ChartFieldSelector from '../containers/ChartFieldSelector'
import ModalShare from '../containers/ModalShare'
import { BASE_HREF, NUMBEROFTICKSY, NUMBEROFTICKSX, MAXPOWEROFT10 } from '../constants/AppConstants'
import pluralize from 'pluralize'


class VizContainer extends Component {
  componentWillMount () {
    let { queryString } = this.props.props
    let { loadQueryStateFromString } = this.props.actions

    if (queryString.selectedColumn) {
      setTimeout(() => {
        loadQueryStateFromString(queryString)
      }, 700)
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
        <Col className={'VizContainer__config'} style={{top: '65px'}}>
          <Accordion>
            <ChartFieldSelector />
            <ConditionalOnSelect selectedColumn={props.selectedColumn}>
              <ChartTypePicker
                chartTypes={props.supportedChartTypes}
                chartType={props.chartType}
                isGroupBy={props.isGroupBy}
                onChangeChartColor={actions.changeChartColor}
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
                        rollupBy={props.rollupBy}
                        chartType={props.chartType} />
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
                          chartColor={props.chartColor}
                          chartColorsGrpBy={props.chartColorsGrpBy}
                          chartData={props.chartData || []}
                          chartType={props.chartType}
                          isFetching={props.isFetching}
                          dateBy={props.dateBy}
                          maxPowerOf10={MAXPOWEROFT10}
                          yTickCnt={NUMBEROFTICKSY}
                          xTickCnt={NUMBEROFTICKSX}
                          rollupBy={props.rollupBy}
                          isGroupBy={props.isGroupBy}
                          groupKeys={props.groupKeys}
                          filters={props.filters}
                          rowLabel={props.rowLabel}
                          units={props.units}
                          selectedColumnDef={props.selectedColumnDef}
                          groupBy={props.groupBy}
                          sumBy={props.sumBy}
                          freqs={props.freqs}
                          domainMax={props.domainMax}
                          colName={props.colName}
                          valueAxisTickLst={props.valueAxisTickLst || []}
                          isDateSelectedCol={props.isDateSelectedCol}
                          numericCol={props.numericCol}
                          viewportHeight={props.viewportHeight}
                          chartTitleHeight={props.chartTitleHeight}
                          topOffset={props.topOffset}
                          />
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
  let colName = ''
  let selectedColumnDef = getSelectedColumnDef(state)
  let chartType = chart.chartType
  const id = ownProps.params.id
  let queryState = Object.assign({}, query)
  delete queryState.isFetching
  const encodedJSON = encodeURIComponent(JSON.stringify(queryState))
  const embedLink = BASE_HREF + '/#/e/' + id + '?q=' + encodedJSON
  const embedCode = '<iframe src="' + embedLink + '" width="100%" height="400" allowfullscreen frameborder="0"></iframe>'
  const exclude = query.filters ? Object.keys(query.filters) : []
  let units = query.sumBy ? columnProps.columns[query.sumBy].name : metadata.rowLabel
  units = typeof units === 'string' ? pluralize(units) : units
  let isGroupBy = isGroupByz(chart.groupKeys)
  if (selectedColumnDef) {
    colName = selectedColumnDef.name
  }
  let chartData = chart.chartData || []
  let chartColor =  query.chartColor || '#2196f3'
  let valueAxisTickLst = roundAxisZeros(chart.domainMax, NUMBEROFTICKSY, MAXPOWEROFT10) || []
  return {
    props: {
      chartColor: query.chartColor || '#2196f3',
      chartColorsGrpBy: setGroupByColorScale(chartColor, chartData, isGroupBy),
      name: ownProps.name,
      frontMatterHeight: ownProps.frontMatterHeight,
      topOffset: ownProps.topOffset,
      viewportHeight: ownProps.viewportHeight,
      chartTitleHeight: ownProps.chartTitleHeight,
      id,
      embedCode,
      messages,
      numericCol: isColTypeTest(selectedColumnDef, 'number'),
      colName: colName,
      isGroupBy: isGroupByz(chart.groupKeys),
      isDateSelectedCol: isColTypeTest(selectedColumnDef, 'date'),
      supportedChartTypes: getSupportedChartTypes(state),
      queryString: ownProps.location.query,
      chartType: chartType,
      chartData: chartData,
      rollupBy: chart.rollupBy,
      groupKeys: chart.groupKeys,
      selectedColumn: query.selectedColumn,
      selectedColumnDef: selectedColumnDef,
      columns: columnProps.columns,
      isFetching: query.isFetching,
      valueAxisTickLst: valueAxisTickLst,
      groupBy: query.groupBy,
      sumBy: query.sumBy,
      dateBy: query.dateBy || 'year',
      filters: query.filters,
      rowLabel: metadata.rowLabel,
      units: units,
      freqs: explodeFrequencies(chartData, chartType),
      domainMax: chart.domainMax,
      xAxisInterval: setXAxisTickInterval(chartData),
      summableColumns: getSummableColumns(state),
      groupableColumns: getGroupableColumns(state),
      selectableColumns: getSelectableColumns(state),
      filterableColumns: getFilterableColumns(state, exclude)
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
      changeChartColor: (chartColor) => {
        return dispatch(changeChartColor(chartColor))
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
