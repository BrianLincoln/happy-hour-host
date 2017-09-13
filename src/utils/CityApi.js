import _ from 'lodash';
import config from './../config';

const cityApi = {
   getCities: function() {
    return fetch(config.apiPath + '/cities').then((response) => response.json())
    .then((response) => {
        if (response.loggedIn === false) {
            //window.location.href = "/admin/login";
        } else {
            return response;
        }
    });
   },
   postCity: function(name) {
    return fetch(config.apiPath + '/city', {      
        method: 'post',
        body: JSON.stringify({
            name: name
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }        
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
   },
   deleteCity: function(_id) {
    return fetch(config.apiPath + '/city', {      
        method: 'delete',
        body: JSON.stringify({
            _id: _id
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }        
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
   },

   getNeighborhoods: function(cityId) {
    return fetch(config.apiPath + '/city/' + cityId + '/neighborhood',).then((response) => response.json())
    .then((neighborhoods) => {
        // do stuff with responseJSON here...
       return neighborhoods;
    });
   },
   postNeighborhood: function(cityId, neighborhoodName) {
    return fetch(config.apiPath + '/city/' + cityId + '/neighborhood', {      
        method: 'post',
        body: JSON.stringify({
            name: neighborhoodName
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }        
    })
    .then(function(res){ console.log(res) })
    .catch(function(res){ console.log(res) })
   },

}


export default cityApi;