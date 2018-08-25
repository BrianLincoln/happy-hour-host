import config from '../config';

const ratingApi = {
  rateSpecial(specialId, isAccurate) {
    return fetch(`${config.apiPath}/ratings`, {
      method: 'post',
      body: JSON.stringify({
        rating: {
          isAccurate,
          specialId,
        },
        token: localStorage.authToken,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => response);
  },
};

export default ratingApi;
