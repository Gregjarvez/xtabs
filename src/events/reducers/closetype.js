import constants from '../constants';

const closeType = (state = 'left-most', action) => {
  switch (action.type) {
    case constants.CLOSETYPE:
      return action.payload;
    default:
      return state;
  }
};

export default closeType;
