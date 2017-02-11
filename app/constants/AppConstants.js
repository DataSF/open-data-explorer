export const DEBUG = (process.env.NODE_ENV !== 'production')
export const APP_TITLE = 'Open Data Explorer'
export const NAVIGATION_UPDATED = 'NAVIGATION_UPDATED'
export const API_DOMAIN = 'data.sfgov.org'
export const DATANULL = -9999
export const BASE_HREF = (DEBUG ? 'http://localhost:8000' : 'http://datasf-explorer.tk')
export const ICONS = {
  'text': 'fa-keyboard-o',
  'date': 'fa-calendar',
  'number': 'fa-list-ol',
  'location': 'fa-globe',
  'checkbox': 'fa-check'
}
