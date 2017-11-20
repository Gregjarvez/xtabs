import constants from '../constants';

const searchWord = (state = '', action) => {
  switch (action.type) {
    case constants.SETWORD:
      return action.payload;
    default:
      return state;
  }
};

export default searchWord;
