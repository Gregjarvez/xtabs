import { combineReducers } from 'redux';
import tabs from './tabs';
import searchWord from './searchWord';
import tabLimit from './limitReducer';

const rootReducers = combineReducers({
  tabs,
  tabLimit,
  searchWord,
});

export default rootReducers;
