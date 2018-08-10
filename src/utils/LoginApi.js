import config from '../config';

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
  getUserFromAuthToken() {
    return fetch(`${config.apiPath}/user-from-token`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.authToken,
      },
    })
      .then(res => res.json())
      .then(res => res)
      .catch((res) => {
        console.log(res);
      });
  },
  login(email, password) {
    return fetch(`${config.apiPath}/authenticate`, {
      method: 'post',
      body: JSON.stringify({
        email: email.value,
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
          window.location = '/';
        }

        return res;
      })
      .catch((res) => {
        console.log(res);
      });
  },

  signUp(email, password) {
    return fetch(`${config.apiPath}/signup`, {
      method: 'post',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
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
    window.location = '/login';
  },

  forgotPassword(email) {
    return fetch(`${config.apiPath}/forgot-password`, {
      method: 'post',
      body: JSON.stringify({
        email: email.value,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => response)
      .catch((res) => {
        console.log(res);
      });
  },

  resetPassword(
    email, password, token
  ) {
    return fetch(`${config.apiPath}/reset-password/${token}`, {
      method: 'post',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => response)
      .catch((res) => {
        console.log(res);
      });
  },
};

export default loginApi;
