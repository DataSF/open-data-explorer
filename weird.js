/*
  isSelectedColDate (selectedColumnDef) {
    if (selectedColumnDef.type === 'date') {
     return true
    }
    return false
  }

  formatChartDataDates (itemList, dateBy) {
    let yrFormat = d3.time.format('%Y')
    let monthFormat = d3.time.format('%m-%Y')
    itemList = itemList.map(function (item, index) {
      let dt = item['label'].split('T')
      dt = dt[0].split('-')
      if (dateBy === 'month') {
        item['key'] = monthFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      } else {
        item['key'] = yrFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      }
      item['value'] = Number(item['value'])
      return item
    })
    return itemList
  }

  formatChartDataDatesGrpBy (itemList, dateBy) {
    let yrFormat = d3.time.format('%Y')
    let monthFormat = d3.time.format('%m-%Y')
    itemList = itemList.map(function (item, index) {
      if (dateBy === 'month') {
        item['label'] = monthFormat(new Date(item['label']))
      } else {
        item['label'] = yrFormat(new Date(item['label']))
      }
      return item
    })
    return itemList
  }

  formatChartDataCol (itemList) {
    itemList = itemList.map(function (item, index) {
      item['key'] = String(item['label'])
      item['value'] = Number(item['value'])
      return item
    })
    return itemList
  }

  formatBlankChartData (itemList) {
    itemList = itemList.map(function (item, index) {
      if (item['key'] === 'undefined') {
        item['blank'] = Number(item['value'])
      }
      return item
    })
    delete itemList['undefined']
    return itemList
  }

  formatWhiteSpaceChartData (itemList) {
    itemList = itemList.map(function (item, index) {
      item['key'] = item['key'].replace(/(\r\n|\n|\r|\t)/gm, 'whitespace')
      item['key'] = item['key'].replace('  ', 'whitespace')
      if (item['key'] === ' ') {
        item['key'] = 'whitespace'
      }
      return item
    })
    return itemList
  }

  castChartData (chartData, isDtCol, dateBy) {
    let newChartData = []
    if (isDtCol) {
      newChartData = this.formatChartDataDates(chartData, dateBy)
    } else {
      newChartData = this.formatChartDataCol(chartData)
    }
    newChartData = this.formatBlankChartData(newChartData)
    newChartData = this.formatWhiteSpaceChartData(newChartData)
    return newChartData
  }

  formatChartDataGrpBy (itemList, dateBy, isDateCol) {
    let newdict = {}
    let yrFormat = d3.time.format('%Y')
    let monthFormat = d3.time.format('%m-%Y')
    Object.keys(itemList).forEach(function (key, index) {
      if (key === 'label') {
        newdict[key] = String(itemList[key])
        if (newdict[key] === 'undefined') {
          newdict[key] = 'blank'
        }
      } else if (key === 'undefined') {
        newdict['blank'] = Number(itemList[key])
      } else {
        newdict[key] = Number(itemList[key])
      }
    })

    if (isDateCol) {
      let dt = newdict['label'].split('T')
      dt = dt[0].split('-')
      if (dateBy === 'month') {
        newdict['label'] = monthFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      } else {
        newdict['label'] = yrFormat(new Date(String(dt[0]), String(Number(dt[1]) - 1), String(dt[2])))
      }
    }
    return newdict
  }

  castChartDataGrpBy (chartData, isDtCol, dateBy) {
    let newChartData = []
    for (let i = 0; i < chartData.length; i++) {
      let newdict = this.formatChartDataGrpBy(chartData[i], dateBy, isDtCol)
      newChartData.push(newdict)
    }
    return newChartData
  }
  sortChartDataGrpByDate (newChartData, dateBy) {
    if (dateBy === 'month') {
      newChartData.sort(function(a, b){
        let keyA = new Date(a.label),
        keyB = new Date(b.label);
      // Compare the 2 dates
      if(keyA < keyB) return -1;
      if(keyA > keyB) return 1;
      return 0
  })

    } else {
      newChartData.sort(function (a, b) {
        return Number(a.label) - Number(b.label)
      })
    }
    return newChartData
  }

  sortChartDataGrpBy (newChartData) {
    let sortedNewChartData = []
    let grpSumDict = {}
    Object.keys(newChartData).forEach(function (key, index) {
      grpSumDict[key] = sumObj(newChartData[key], 'label')
    })
    let sorted = sortObj(grpSumDict)
    for (let i = 0; i < sorted.length; i++) {
      let idx = sorted[i][0]
      sortedNewChartData.push(newChartData[idx])
    }
    return sortedNewChartData
  }

  convertChartData (chartData, selectedColumnDef, dateBy, isGroupBy) {
    //let newChartData = []
    let isDtCol = isColTypeTest(selectedColumnDef, 'date')
    if (chartData && chartData.length > 1) {
      if (!isGroupBy) {
        return this.castChartData(chartData, isDtCol, dateBy)
      }
    }
    return chartData
  }

  getMaxDate (dateBy, chartType, chartData) {
    let maxDt = ''
    if (chartType === 'line') {
      maxDt = Math.max.apply(Math, chartData.map(function (o) { return o.key }))
    }
    return maxDt
  }

  /*isGroupByz (groupByKeys) {
    if (groupByKeys) {
      if (groupByKeys.length > 0) {
        return true
      }
    }
    return false
  }

  setDefaultChartType (selectedColumnDef, chartType) {
    let isDateCol = isColTypeTest(selectedColumnDef, 'date')
    let isNumericCol = isColTypeTest(selectedColumnDef, 'number')
    if (!(chartType)) {
      if (isDateCol) {
        chartType = 'line'
      } else if (isNumericCol) {
        chartType = 'histogram'
      } else {
        chartType = 'bar'
      }
    }
    return chartType
  }*/
