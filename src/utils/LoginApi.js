import config from './../config';

const loginApi = {
  verifiyToken(token) {
    return fetch(`${config.apiPath}/verfiy-token`, {
      method: 'post',
      body: JSON.stringify({
        token,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => res)
      .catch((res) => {
        console.log(res);
      });
  },
  postLogin(username, password) {
    return fetch(`${config.apiPath}/authenticate`, {
      method: 'post',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem('authToken', res.token);
          window.location = '/admin';
        }
      })
      .catch((res) => {
        console.log(res);
      });
  },

  postSignUp(
    username, password, secretCode
  ) {
    return fetch(`${config.apiPath}/signup`, {
      method: 'post',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        secretCode: secretCode.value,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.status)
      .catch((res) => {
        console.log(res);
      });
  },

  signOut() {
    localStorage.removeItem('authToken');
    window.location = '/';
  },
};

export default loginApi;
