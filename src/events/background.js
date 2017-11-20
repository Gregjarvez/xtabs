import { createStore, applyMiddleware } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import logger from './middleware';
import App from '../scripts';

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

new App(store);

wrapStore(store, {
  portName: 'stackTabs'
});

export default store;
