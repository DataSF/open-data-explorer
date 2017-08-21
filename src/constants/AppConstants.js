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
export const MAXPOWEROFT10 = 10
export const NUMBEROFTICKSX = 6
