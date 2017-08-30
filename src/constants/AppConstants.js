const context = process.env.NODE_ENV === 'development' ? process.env.NODE_ENV : process.env.REACT_APP_CONTEXT
const APP_URLS = {
  development: 'http://localhost:3000',
  production: 'http://beta.explore.datasf.org',
  staging: 'http://edge.explore.datasf.org'
}

export const DEBUG = (process.env.NODE_ENV !== 'production')
export const APP_TITLE = 'Open Data Explorer'
export const NAVIGATION_UPDATED = 'NAVIGATION_UPDATED'
export const API_DOMAIN = 'data.sfgov.org'
export const DATANULL = -9999
export const BASE_HREF = APP_URLS[context]

//export  dx = 0
//let margin = {top: 1, right: 5, bottom: 1, left: 5}
//

/***Chart variables*****/
export const NUMBEROFTICKSY = 10
export const MAXPOWEROFT10 = 20
export const NUMBEROFTICKSX = 6
export const GRPBYCOLORSBASE = ['#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#f2c407','#b15928', '#a6cee3','#1f78b4']

export const GRADIATIONFXNS  = {
      // 'normal': function(chromaColor, step){
      //   return chromaColor.hex()
      //},
      'desaturate': function(chromaColor, step){
        let color = chromaColor.desaturate(step).hex()
        return color
      },

      'saturate': function(chromaColor, step){
        let color = chromaColor.saturate(step).hex()
        return color
      },

      'darken': function(chromaColor, step){
        let color =  chromaColor.darken(step).hex()
        return color
      },
      'brighten': function(chromaColor, step){
        let color = chromaColor.brighten(step).hex()
        return color
      }
}
