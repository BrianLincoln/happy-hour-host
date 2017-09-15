import _ from 'lodash';
import config from './../config';

const loginApi = {
    postLogin: function(username, password) {
        return fetch(config.apiPath + '/authenticate', {      
            method: 'post',
            body: JSON.stringify({
                username: username.value,
                password: password.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then((res) => { 
            return res.json()
        })
        .then((res) => { 
            if (res.success) {
                localStorage.setItem('authToken', res.token);
                window.location = "/admin";
            }
        })
        .catch(function(res){ console.log(res) })
    },

    postSignUp: function(username, password, secretCode) {
        return fetch(config.apiPath + '/signup', {      
            method: 'post',
            body: JSON.stringify({
                username: username.value,
                password: password.value,
                secretCode: secretCode.value
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then((res) => { return res.status })
        .catch(function(res){ console.log(res) })
    },

    signOut: function() {
        localStorage.removeItem('authToken');
        window.location = "/";
    }
       
}


export default loginApi;