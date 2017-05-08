import { configure } from '@kadira/storybook';
import '../src/styles/bootstrap-explorer.css'
function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
