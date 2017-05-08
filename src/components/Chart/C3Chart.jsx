import './_Chart.scss'
const React = require('react')
const _ = require('lodash')

const c3 = require('c3')
const d3 = require('d3')

let C3Chart = React.createClass({
  displayName: 'C3Chart',
  propTypes: {
    type: React.PropTypes.string.isRequired,
    data: React.PropTypes.array.isRequired,
    options: React.PropTypes.shape({
      padding: React.PropTypes.shape({
        top: React.PropTypes.number,
        bottom: React.PropTypes.number,
        left: React.PropTypes.number,
        right: React.PropTypes.number
      }),
      size: React.PropTypes.shape({
        width: React.PropTypes.number,
        height: React.PropTypes.number
      }),
      labels: React.PropTypes.bool,
      onclick: React.PropTypes.func,
      axisLabel: React.PropTypes.shape({
        x: React.PropTypes.string,
        y: React.PropTypes.string
      }),
      tickFormat: React.PropTypes.shape({
        x: React.PropTypes.func,
        y: React.PropTypes.func
      }),
      subchart: React.PropTypes.bool,
      zoom: React.PropTypes.bool,
      grid: React.PropTypes.shape({
        x: React.PropTypes.bool,
        y: React.PropTypes.bool
      })
    })
  },

  chart: null,

  setChart: function (chart) {
    this.chart = chart
  },

  getChart: function () {
    return this.chart
  },

  // color theme
  colors: function (count) {
    let makeColors = function () {
      let bColorsFxn = d3.scale.category20()
      let colors = bColorsFxn.range()
      return colors
    }

    let colors = makeColors()
    return colors
  },

  // apply props.options to graph json
  graphObject: function () {
    let {options, chartData} = this.props
    let graphObject = {
      data: {},
      axis: {},
      bindto: '#chartCanvas',
      color: {
        pattern: this.colors(50)
      }
    }

    if (options.padding) {
      graphObject.padding = {
        top: options.padding.top,
        left: options.padding.left,
        right: options.padding.right,
        bottom: options.padding.bottom
      }
    }
    if (options.stacked) {
      graphObject.data.groups = [this.multiDmsGroups(this.props.chartData)]
    }
    if (options.rotated) {
      graphObject.axis.rotated = true
    }
    if (options.size) {
      graphObject.size = {
        width: options.size.width,
        height: options.size.height
      }
    }
    if (options.labels) {
      graphObject.data.labels = options.labels
    }
    if (options.onClick) {
      graphObject.data.onclick = options.onClick
    }
    if (options.axisLabel) {
      graphObject.axis.x = {label: {text: options.axisLabel.x, position: 'outer-center'}}
      graphObject.axis.y = {label: {text: options.axisLabel.y, position: 'outer-middle'}}
    }
    if (options.tickFormat.x) {
      graphObject.axis.x.tick = {format: options.tickFormat.x}
    }
    if (options.tickFormat.y) {
      graphObject.axis.y.tick = {format: options.tickFormat.y}
    }

    graphObject.axis.y.tick = {format: options.tickFormat.y}
    if (options.timeseries) {
      let format = '%Y'
      if (Array.isArray(chartData[0])) {
        format = chartData[0][1].substring(0, 4) === chartData[0][2].substring(0, 4) ? '%m/%Y' : '%Y'
      } else {
        format = chartData[0].values[0].label.substring(0, 4) === chartData[0].values[1].label.substring(0, 4) ? '%m/%Y' : '%Y'
      }
      graphObject.data.xFormat = '%Y-%m-%dT%H:%M:%S.%L'
      graphObject.axis.x =
      {type: 'timeseries', tick: {culling: true, format: format}
      }
    }
    if (options.subchart) {
      graphObject.subchart = {show: options.subchart}
    }
    if (options.zoom) {
      graphObject.zoom = {enabled: options.zoom}
    }
    if (options.grid) {
      graphObject.grid = {
        x: {show: options.grid.x},
        y: {show: options.grid.y}
      }
    }
    return graphObject
  },

  // c3.js
  drawGraph: function () {
    let multi = false
    if (this.props.chartData.length > 1) {
      multi = true
    }
    let displayChartOptions = this.props.displayChartOptions
    switch (this.props.type) {
      case 'line':
        this.setChart(this.drawGraphLineOrArea(false, multi))
        break
      case 'area':
        this.setChart(this.drawGraphLineOrArea(true, multi))
        break
      case 'bar':
        this.setChart(this.drawGraphBar(multi, displayChartOptions))
        break
      case 'pie':
        this.setChart(this.drawGraphPie())
        break
      case 'multiBar':
        this.setChart(this.drawGraphMultiBar(false))
        break
      case 'multiBarGroup':
        this.setChart(this.drawGraphMultiBar(true))
        break
      case 'lineBar':
        this.setChart(this.drawGraphlLineBar())
        break
    }
  },

  drawGraphLineOrArea: function (area, multi) {
    let graphObject = this.graphObject()
    let graphObjectData = {}
    if (multi) {
      graphObjectData = {
        x: 'x',
        columns: Array.isArray(this.props.chartData[0]) ? this.props.chartData : this.multiDmsDataPreparator(this.props.chartData)
      }
    } else {
      graphObjectData = {
        json: this.props.chartData[0].values,
        keys: { x: 'label', value: ['value'] },
        names: { value: this.props.chartData[0].key }
      }
    }
    if (area && this.props.chartData.length === 2) {
      graphObjectData.type = 'area'
    }

    let graphObjectAxis = {

      x: { type: 'category' } // this needed to load string x value
    }
    if (graphObject.axis.x.type && graphObject.axis.x.type === 'timeseries') {
      graphObjectAxis = {}
    }

    graphObject.data = _.merge(graphObjectData, graphObject.data)
    graphObject.axis = _.merge(graphObjectAxis, graphObject.axis)
    let chart = c3.generate(graphObject)
    return chart
  },

  dataPrepBarMulti: function (rawData) {
    /*
    function zip (arrays) {
      return arrays[0].map(function (_, i) {
        return arrays.map(function (array) {
          return array[i]
        })
      })
    }
    function chunkIt (someArray) {
      // dont actually end up using this; could be useful later.
      var groupSize = 2
      var groups = _.map(someArray, function (item, index) {
        return index % groupSize === 0 ? someArray.slice(index, index + groupSize) : null
      })
        .filter(function (item) {
          return item
        })
      return groups
    }
    */

    function filterOutZeros (chunkVals, chunkKeys = false) {
      // edits array directly
      var index = 0
      while (index !== -1) {
        index = chunkVals.indexOf(0)
        if (index !== -1) {
          chunkVals.pop(index)
          if (chunkKeys) {
            chunkKeys.pop(index)
          }
        }
      }
    }

    let limitLongTail = (chunk) => {
      let {dataType} = this.props
      filterOutZeros(chunk[1], chunk[0])
      if (chunk[0].length > 12 && dataType !== 'number') {
        var keys7 = chunk[0].slice(0, 12)
        var counts7 = chunk[1].slice(0, 12)
        // var keysRest = chunk[0].slice(12, chunk[0].length)
        var countsRest = chunk[1].slice(12, chunk[1].length)
        // /stores all the k,v pairs of the longTail
        // var dataDictOther = zip([keysRest, countsRest])
        var intCountsRest = countsRest.map(Number)
        // reducer function to get sum
        var total = intCountsRest.reduce((a, b) => a + b, 0)
        keys7.push('Other')
        counts7.push(total)
        var newData = []
        newData[0] = keys7
        newData[1] = counts7
        return newData
      } else {
        return chunk
      }
    }

    function notEmpty (col, data) {
      // var header = col.pop(0)
      var colNums = col.slice(1, col.length)
      colNums = colNums.map(Number)
      var colSum = 0
      colSum = colNums.reduce((a, b) => a + b, 0)
      // arbitrary lower limit of 15
      if (colSum > 0 && data.length < 25) {
        return true
      } else if (colSum > 15) {
        return true
      }
      return false
    }

    function removeZeroRows (newData) {
      var maxRowSum = 0
      var removeIndexes = []
      for (let i = 1; i < newData[0].length; i++) {
        var zeroRow = []
        for (let j = 1; j < newData.length; j++) {
          zeroRow = zeroRow.concat(newData[j][i])
        }
        zeroRow = zeroRow.map(Number)
        var rowSum = zeroRow.reduce((a, b) => a + b, 0)
        if (rowSum > maxRowSum) {
          maxRowSum = rowSum
        }
        if (rowSum === 0) {
          removeIndexes.push(i)
        } else {
          // remove groups that are less than one percent of largest group.
          var threshold = 0.01
          var zeroRowRatio = rowSum / maxRowSum
          if (zeroRowRatio < threshold) {
            removeIndexes.push(i)
          }
        }
      }
      for (let k = 0; k < removeIndexes.length; k++) {
        var removedIndex = removeIndexes[k]
        newData[0].pop(removedIndex)
        for (let z = 1; z < newData.length; z++) {
          newData[z].pop(removedIndex)
        }
      }
    }

    function limitLongTailGroupBy (chunk) {
      var newData = []
      newData = newData.concat([chunk[0]])
      var cols = chunk.slice(1, chunk.length + 1)
      for (let i = 0; i < cols.length; i++) {
        if (notEmpty(cols[i], chunk)) {
          newData = newData.concat([cols[i]])
        }
      }
      removeZeroRows(newData)
      return newData
    }

    var cleanedData
    if (this.props.chartData.length === 2) {
      cleanedData = limitLongTail(rawData)
    } else {
      cleanedData = limitLongTailGroupBy(rawData)
    }
    return cleanedData
  },

  drawGraphBar: function (multi, displayChartOptions) {
    let graphObject = this.graphObject()
    let graphObjectData = {
      x: 'x',
      type: 'bar'
    }
    if (!multi) {
      graphObjectData = _.merge(graphObjectData, {
        json: this.props.chartData[0].values,
        keys: { x: 'label', value: ['value'] },
        names: { value: this.props.chartData[0].key }
      })
    } else {
      let barData = []
      if (displayChartOptions) {
        barData = this.props.chartData
      } else {
        barData = this.dataPrepBarMulti(this.props.chartData)
      }

      graphObjectData = _.merge(graphObjectData, {
        columns: Array.isArray(barData[0]) ? barData : this.multiDmsDataPreparator(barData)

      })
    }
    let graphObjectAxis = {
      x: { type: 'category' } // this needed to load string x value
    }
    if (graphObject.axis.rotated) {
      var xWidth = {
        x: {
          tick: {
            width: graphObject.padding.left
          }
        }
      }
      graphObjectAxis = _.merge(xWidth, graphObjectAxis)
    }

    graphObject.data = _.merge(graphObjectData, graphObject.data)
    graphObject.axis = _.merge(graphObjectAxis, graphObject.axis)
    let chart = c3.generate(graphObject)
    return chart
  },

  drawGraphPie: function () {
    let graphObject = this.graphObject()
    let graphObjectData = {
      columns: this.pieChartDataPreparator(this.props.chartData[0].values),
      type: 'pie'
    }

    graphObject.data = _.merge(graphObjectData, graphObject.data)

    let chart = c3.generate(graphObject)
    return chart
  },

  multiDmsDataPreparator: function (rawData) {
    let xLabels = ['x'] // to make ['x', 'a', 'b', 'c' ...] for labels
    _.map(rawData[0].values, (d) => {
      xLabels.push(d.label)
    })

    let data
    /*
    let total = rawData.reduce((prev, curr) => {
      let sum = 0
      curr.values.reduce((p, c) => {
        sum += parseInt(c.value)
      }, 0)
      return prev + sum
    }, 0)
    */

    data = _.map(rawData, (datum) => {
      let row = [datum.key] // to make ['key', 30, 200, 100, 400 ...] for each row
      _.map(datum.values, (d) => {
        row.push(d.value)
      })
      return row
    })
    data.push(xLabels)
    return data
  },

  multiDmsGroups: function (rawData) {
    let groups
    if (Array.isArray(rawData[0])) {
      groups = _.map(rawData, (datum) => {
        if (datum[0] === 'x') {
          return false
        } else {
          return datum[0]
        }
      })
    } else {
      groups = _.map(rawData, (datum) => {
        return datum.key
      })
    }

    return groups
  },

  drawGraphMultiBar: function (group) {
    let graphObject = this.graphObject()
    let graphObjectData = {
      x: 'x',
      columns: this.multiDmsDataPreparator(this.props.chartData),
      type: 'bar'
    }
    let graphObjectAxis = {
      x: { type: 'category' } // this needed to load string x value
    }

    if (group) {
      graphObjectData.groups = [this.multiDmsGroups(this.props.chartData)]
    }

    if (graphObject.axis.rotated) {
      var xWidth = {
        x: {
          tick: {
            width: graphObject.padding.left
          }
        }
      }
      graphObjectAxis = _.merge(xWidth, graphObjectAxis)
    }

    graphObject.data = _.merge(graphObjectData, graphObject.data)
    graphObject.axis = _.merge(graphObjectAxis, graphObject.axis)

    let chart = c3.generate(graphObject)
    return chart
  },

  drawGraphlLineBar: function () {
    let graphObject = this.graphObject()
    let graphObjectData = {
      x: 'x',
      columns: this.multiDmsDataPreparator(this.props.chartData),
      types: {dataSource1: 'bar'}
    }
    let graphObjectAxis = {
      x: { type: 'category' } // this needed to load string x value
    }

    graphObject.data = _.merge(graphObjectData, graphObject.data)
    graphObject.axis = _.merge(graphObjectAxis, graphObject.axis)
    let chart = c3.generate(graphObject)
    return chart
  },

  componentDidMount: function () {
    this.drawGraph()
  },

  componentDidUpdate: function () {
    this.drawGraph()
  /*
  let chart = this.getChart()
  if (this.props.order.length > 0) {
    let show = (this.props.viewOption === 'top' ? this.props.order.slice(0, 5) : (this.props.viewOption === 'bottom' ? this.props.order.slice(-5) : this.props.order))
    chart.hide()
    this.props.viewOption === 'compare' ? chart.show() : chart.show(show)
  } */
  },

  render: function () {
    return (<div id='chartCanvas' />)
  }
})

module.exports = C3Chart
