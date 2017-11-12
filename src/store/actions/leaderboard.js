import axios from 'axios';

// *** Leaderboard pulls all records from stats table and sorts data accordingly ***

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