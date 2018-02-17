import { createStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import IOEvents from '../scripts/events';

const logger = store => next => (action) => {
  console.group('start');
  console.log(store.getState());
  console.log(action);
  console.groupEnd('start');
  return next(action);
};

const store = createStore(rootReducer);

// eslint-disable-next-line
new IOEvents(store);

wrapStore(store, {
  portName: 'stackTabs'
});
