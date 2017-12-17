import constants from '../constants';

export const deleteTab = id => ({
  type: constants.DELETE_TAB,
  payload: id
});

export const saveTabs = tab => ({
  type: constants.SAVE_TAB,
  payload: tab
});

export const setLimit = limit => ({
  type: constants.SETLIMIT,
  payload: limit
});

export const setWord = word => ({
  type: constants.SETWORD,
  payload: word
});

export const closeType = id => ({
  type: constants.CLOSETYPE,
  payload: id
});

export const removeOnOpen = id => ({
  type: constants.REMOVE_ON_OPEN,
  payload: id
});
