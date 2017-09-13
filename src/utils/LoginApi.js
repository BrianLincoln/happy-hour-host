import _ from 'lodash';
import config from './../config';

const loginApi = {
    postLogin: function(username, password) {
        console.log("x: ", username.value, " - ", password.value);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", config.apiPath + '/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            username: username.value,
            password: password.value
        }));
    },

    postSignUp: function(username, password, secretCode) {
        console.log("x: ", username.value, " - ", password.value, " - ", secretCode.value);
        return fetch(config.apiPath + '/sign-up', {      
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