import _ from 'lodash';
import config from './../config';

//TEMP -- this should get dynamic once there are multiple cities
const minneapoliscityId = "598392e1f69ccd390c5983c8";

const locationApi = {
   getLocations: function() {
    return fetch(config.apiPath + '/city/' + minneapoliscityId + '/locations').then(function(response) {                 
        return response.json();
    });
   },
   getLocationsByCity: function(city) {
        return fetch(config.apiPath + '/city/' + city + '/locations').then((response) => response.json())
        .then((cities) => {
            // do stuff with responseJSON here...
            return cities;
        });
   },   
   getLocation: function(cityId, locationId) {
        return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}`)
        .then((response) => {
            return response.json();
        });
   },
   getLocationByDisplayNames : function(cityName, locationName) {
    return fetch(config.apiPath + '/city-name/' + cityName + '/location-name/' + locationName,).then((response) => response.json())
    .then((location) => {
        // do stuff with responseJSON here...
       return location;
    });
   },   
    postLocation: function(cityId, location) {
        return fetch(`${config.apiPath}/city/${cityId}/location`, {      
            method: 'post',
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
    updateLocation: function(cityId, location) {
        return fetch(`${config.apiPath}/city/${cityId}/location/${location._id}`, {      
            method: 'PUT',
            body: JSON.stringify({
                _id: location._id,
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
    deleteLocation: function(cityId, locationId) {
        return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}`, {      
            method: 'delete',            
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    },
    postSpecial: function(cityId, locationId, special) {
        return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}/special`, {      
            method: 'post',
            body: JSON.stringify({...special}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }        
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }, 
    updateSpecial: function(cityId, locationId, specialId, special) {
        return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}/special/${specialId}`, {      
            method: 'put',
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