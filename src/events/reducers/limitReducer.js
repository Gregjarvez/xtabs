import constants from '../constants/index';

const tabLimit = (state = 6, action) => {
  switch (action.type) {
    case constants.SETLIMIT:
      return action.payload;
    default:
      return state;
  }
};

export default tabLimit;
