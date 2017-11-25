import { createStore, applyMiddleware } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import App from '../scripts';


const logger = store => next => (action) => {
  console.log(store.getState());
  next(action);
};

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

const app = new App(store);

wrapStore(store, {
  portName: 'stackTabs'
});

export default store;
