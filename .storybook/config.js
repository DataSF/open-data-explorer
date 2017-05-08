import { configure } from '@kadira/storybook'
import 'bootstrap-loader'

function loadStories () {
  require('../app/stories/index.js')
  // You can require as many stories as you need.
}

configure(loadStories, module)
