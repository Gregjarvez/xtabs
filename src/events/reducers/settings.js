import constants from '../constants';

const settings = (state = { tabLimit: 10, closeType: 'left-most' }, action) => {
  switch (action.type) {
    case constants.CLOSETYPE:
      return Object.assign({}, state, action.payload);
    case constants.SETLIMIT:
      return Object.assign({}, state, action.payload);
    case constants.HYDRATE:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default settings;
