import { createStore, applyMiddleware } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import logger from './middleware';
import App from '../scripts';

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

wrapStore(store, {
  portName: 'stackTabs'
});

const app = new App();

export default store;
