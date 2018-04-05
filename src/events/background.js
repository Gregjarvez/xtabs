import { createStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import IOEvents from '../scripts/events';
import ContextMenu from '../scripts/contextMenu';

const store = createStore(rootReducer);

// eslint-disable-next-line
const app = new IOEvents(store);
const contextMenu = Object.create(ContextMenu);
contextMenu
  .removePreviousMenu()
  .installMenu()
  .initialActionListener(app);

wrapStore(store, {
  portName: 'stackTabs'
});
