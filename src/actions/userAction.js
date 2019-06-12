import { FETCH_USERS, NEW_USER, UPDATE_USER } from './types';
import axios from 'axios';

const apiEndPoint = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = () => dispatch => {
  axios
    .get(apiEndPoint)
    .then(res =>
      dispatch({
        type: FETCH_USERS,
        payload: res.data
      })
    )
    .catch(res => console.log('Error', res.error));
};

export const createUsers = user => dispatch => {
  fetch(apiEndPoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: NEW_USER,
        payload: user
      })
    );
};

export const updateUser = (user, userId) => dispatch => {
  console.log('Action call');

  fetch(`${apiEndPoint}/${userId}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: UPDATE_USER,
        payload: user
      })
    );
};
