import reactGA from 'react-ga'
import { getLocalTimeWithOffset } from '../helpers'

function analyticsMiddlewareFactory() {
  const logEvent = (params) => {
    reactGA.set({dimension2: getLocalTimeWithOffset()})
    reactGA.event(params)
  }

  return store => next => action => {
    if (action.ga)
    if (action.ga && action.ga.event) {
      logEvent(action.ga.event)
    }

    if (action.ga && action.ga.link) {
      reactGA.set({dimension2: getLocalTimeWithOffset()})
      reactGA.outboundLink(action.ga.link, () => {
        document.location = action.ga.link.label
      }
    )
    }
    return next(action)
  }
}

const analytics = analyticsMiddlewareFactory()

export default analytics