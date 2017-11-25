import { combineReducers } from 'redux';
import tabs from './tabs';
import searchWord from './searchWord';
import tabLimit from './limitReducer';
import closeType from './closetype';

const rootReducers = combineReducers({
  tabs,
  tabLimit,
  searchWord,
  closeType
});

export default rootReducers;
