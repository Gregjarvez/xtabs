import { createStore } from 'redux';
import { wrapStore } from 'react-chrome-redux';
import rootReducer from './reducers';
import App from '../scripts';

const store = createStore(rootReducer);

const app = new App(store);

wrapStore(store, {
  portName: 'stackTabs'
});

export default store;
