import { FETCH_USERS, NEW_USER, UPDATE_USER } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  updatedUser: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        items: action.payload
      };

    case NEW_USER:
      return {
        ...state,
        item: action.payload
      };

    case UPDATE_USER:
      return {
        ...state,
        updatedUser: action.payload
      };

    default:
      return state;
  }
}
