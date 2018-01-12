import { createStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import IOEvents from '../scripts/events';

const store = createStore(rootReducer);

const backgroundEvents = new IOEvents(store);

wrapStore(store, {
  portName: 'stackTabs'
});
