import { FETCH_USERS, NEW_USER, UPDATE_USER } from '../actions/types';

const initialState = {
  items: []
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
        items: [action.payload, ...state.items]
      };

    case UPDATE_USER:
      // const newItems = [];
      // for (let key in state.items) {
      //   if (state.items[key].id === Number(action.payload.id)) {
      //     newItems.push(action.payload);
      //   } else {
      //     newItems.push(state.items[key]);
      //   }
      // }

      let index, newItems;
      for (let item of state.items)
        if (item.id === Number(action.payload.id)) {
          index = state.items.indexOf(item);
        }

      newItems = [...state.items];
      newItems[index] = action.payload;

      return {
        ...state,
        items: newItems
      };

    default:
      return state;
  }
}
