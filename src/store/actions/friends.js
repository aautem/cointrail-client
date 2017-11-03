import axios from 'axios';

export function getUser(userId) {
  return function(dispatch) {
    axios.get('/api/users/' + userId)
      .then((res) => {
        if (!res.data) {
          throw new Error('User does not exist.');
        } else {
          dispatch({
            type: 'LOAD_PROFILE',
            payload: res.data,
          });
        }
      }).catch((e) => {
        console.warn(e);
      });
  }
}