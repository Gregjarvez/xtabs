import { combineReducers } from 'redux';
import tabs from './tabs';
import searchWord from './searchWord';
import settings from './settings';

const rootReducers = combineReducers({
  tabs,
  searchWord,
  settings
});

export default rootReducers;
