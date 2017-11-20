import constants from '../constants';
import {onDelete, onSave, onFilter} from './helpers/tabReducers';

const tabs = (state = [], action) => {
  switch (action.type) {
    case constants.SAVE_TAB:
      return onSave(state, action);
    case constants.DELETE_TAB:
      return onDelete(state, action);
    default:
      return state;
  }
};

export default tabs;
