import _ from 'lodash';
import config from './../config';

//TEMP -- this should get dynamic once there are multiple cities
const minneapolisCityId = "598392e1f69ccd390c5983c8";

const locationApi = {
   getLocations: function() {
    return fetch(config.apiPath + '/city/' + minneapolisCityId + '/locations').then(function(response) { 
        return response.json();
    });
   },
   getLocationsByCity: function(cityId) {
        return fetch(config.apiPath + '/city/' + cityId + '/locations').then((response) => response.json())
        .then((cities) => {
            // do stuff with responseJSON here...
            return cities;
        });
   },   
   getLocation: function(locationId) {
        return fetch(config.apiPath + '/location/' + locationId).then((response) => response.json())
        .then((response) => {
            return response.location;
        });
   },
    postLocation: function(location, cityId) {
        return fetch(config.apiPath + '/location', {      
            method: 'post',
            body: JSON.stringify({
                name: location.name,
                position: {
                    latitude: location.positionLatitude,                
                    longitude: location.positionLongitude
                },
                website: location.website,
                googleMapLink: location.googleMapLink,
                cityId: cityId
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    },
    updateLocation: function(location) {
        return fetch(config.apiPath + '/location/'+ location._id, {      
            method: 'PUT',
            body: JSON.stringify({
                name: location.name,
                position: {
                    latitude: location.positionLatitude,                
                    longitude: location.positionLongitude
                },
                website: location.website,
                googleMapLink: location.googleMapLink
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    },
    deleteLocation: function(locationId) {
        console.log("delete: ", locationId);
        return fetch(config.apiPath + '/location/' + locationId, {      
            method: 'delete',            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    },
    postSpecial: function(special, locationId) {
        return fetch(config.apiPath + '/location/' + locationId + '/special', {      
            method: 'post',
            body: JSON.stringify({
                special: special,
                locationId: locationId
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }, 
    updateSpecial: function(special, locationId, specialId) {
        return fetch(config.apiPath + '/location/' + locationId + '/special/' + specialId, {      
            method: 'post',
            body: JSON.stringify({
                special: special,
                specialId: specialId,
                locationId: locationId
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    },    
    deleteSpecial: function(locationId, specialId) {
        return fetch(config.apiPath + '/location/' + locationId + '/special/' + specialId, {      
            method: 'delete'     
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
   }   
}

export default locationApi;