import _ from 'lodash';
import config from './../config';

const loginApi = {
    postLogin: function(username, password) {
        console.log("x: ", username.value, " - ", password.value);
        return fetch(config.apiPath + '/login', {      
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
            console.log(res);
            return res.status 
        })
        .catch(function(res){ console.log(res) })
    },

    postSignUp: function(username, password, secretCode) {
        console.log("x: ", username.value, " - ", password.value, " - ", secretCode.value);
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
    }
       
}


export default loginApi;