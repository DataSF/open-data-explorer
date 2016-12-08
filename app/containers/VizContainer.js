import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getSelectedColumnDef, getGroupableColumns, getSelectableColumns, getSummableColumns } from '../reducers'
import { selectColumn, groupBy, sumBy, addFilter, applyChartType, removeFilter, applyFilter, updateFilter, changeDateBy } from '../actions'
import BlankChart from '../components/ChartExperimental/BlankChart'
import ConditionalOnSelect from '../components/ConditionalOnSelect'
import ChartExperimentalCanvas from '../components/ChartExperimental/ChartExperimentalCanvas'
import ChartExperimentalTitle from '../components/ChartExperimental/ChartExperimentalTitle'
import ChartExperimentalSubTitle from '../components/ChartExperimental/ChartExperimentalSubTitle'
import CopyEmbedCode from '../components/ChartExperimental/CopyEmbedCode'
import ColumnSelector from '../components/Query/ColumnSelector'
import GroupOptions from '../components/Query/GroupOptions'
import FilterOptions from '../components/Query/FilterOptions'
import SumOptions from '../components/Query/SumOptions'
import { Row, Col, Accordion } from 'react-bootstrap'
import DateToggle from '../components/Query/DateToggle'
import ChartTypeDisplay from '../components/Query/ChartTypeDisplay'
import Loading from '../components/Loading'
import './_containers.scss'

import { BASE_HREF } from '../constants/AppConstants'

const VizContainer = ({ props, actions }) => (
  <Row>
    <Col md={9}>
      <ConditionalOnSelect selectedColumn={props.selectedColumn} displayBlank={<BlankChart />}>
        <div className='chartHeader'>
          <ChartExperimentalTitle
            columns={props.columns}
            rowLabel={props.rowLabel}
            selectedColumnDef={props.selectedColumnDef}
            groupBy={props.groupBy}
            sumBy={props.sumBy} />
          <ChartExperimentalSubTitle
            columns={props.columns}
            filters={props.filters} />
        </div>
        <Loading isFetching={props.isFetching}>
          <Row>
            <Col md={9} />
            <Col md={2}>
              <DateToggle
                dateBy={props.dateBy}
                changeDateBy={actions.changeDateBy}
                selectedColumnDef={props.selectedColumnDef} />
            </Col>
            <Col md={1} />
          </Row>
          <ChartExperimentalCanvas
            chartData={props.chartData}
            chartType={props.chartType}
            dateBy={props.dateBy}
            groupKeys={props.groupKeys}
            filters={props.filters}
            rowLabel={props.rowLabel}
            selectedColumnDef={props.selectedColumnDef}
            groupBy={props.groupBy}
            sumBy={props.sumBy} />
          <CopyEmbedCode snippet={props.embedCode} />
        </Loading>
      </ConditionalOnSelect>
    </Col>
    <Col md={3}>
      <Accordion>
        <ConditionalOnSelect selectedColumn={props.selectedColumn}>
          <GroupOptions columns={props.groupableColumns} selected={props.groupBy} onGroupBy={actions.handleGroupBy} />
          <SumOptions columns={props.summableColumns} selected={props.sumBy} onSumBy={actions.handleSumBy} />
          <FilterOptions
            filters={props.filters}
            columns={props.columns}
            handleAddFilter={actions.handleAddFilter}
            handleRemoveFilter={actions.handleRemoveFilter}
            applyFilter={actions.applyFilter}
            updateFilter={actions.updateFilter} />
          <ChartTypeDisplay
            applyChartType={actions.applyChartType}
            chartType={props.chartType}
            selectedColumnDef={props.selectedColumnDef} />
        </ConditionalOnSelect>
        <ColumnSelector columns={props.selectableColumns} selected={props.selectedColumn} onSelectColumn={actions.selectColumn} />
      </Accordion>
    </Col>
  </Row>
)

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
    filters: PropTypes.object,
    rowLabel: PropTypes.string,
    groupableColumns: PropTypes.array,
    selectableColumns: PropTypes.array
  })
}

const mapStateToProps = (state, ownProps) => {
  const { metadata, chart, columnProps, query } = state
  const id = ownProps.params.id
  let queryState = Object.assign({}, query)
  delete queryState.isFetching
  const embedLink = BASE_HREF + '/#/e/' + id + '?q=' + encodeURIComponent(JSON.stringify(queryState))
  const embedCode = '<iframe src="' + embedLink + '" width="100%" height="400" allowfullscreen frameborder="0"></iframe>'
  return {
    props: {
      id,
      embedCode,
      chartType: chart.chartType,
      chartData: chart.chartData,
      groupKeys: chart.groupKeys,
      selectedColumn: query.selectedColumn,
      selectedColumnDef: getSelectedColumnDef(state),
      columns: columnProps.columns,
      isFetching: query.isFetching,
      groupBy: query.groupBy,
      sumBy: query.sumBy,
      dateBy: query.dateBy,
      filters: query.filters,
      rowLabel: metadata.rowLabel,
      summableColumns: getSummableColumns(state),
      groupableColumns: getGroupableColumns(state),
      selectableColumns: getSelectableColumns(state)
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
      applyChartType: (chartType) => {
        return dispatch(applyChartType(chartType))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VizContainer)
