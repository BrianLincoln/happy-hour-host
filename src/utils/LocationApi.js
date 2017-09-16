import _ from 'lodash';
import config from './../config';

//TEMP -- this should get dynamic once there are multiple cities
const minneapolisCityId = "598392e1f69ccd390c5983c8";

const locationApi = {
   getLocations: function(bounds, filters) {
    return fetch(config.apiPath + '/city/' + minneapolisCityId + '/locations').then(function(response) {
        return response.json();
    }).then(function(response) {
        let results = [];
        if (bounds) {
            results = _.remove(response, function(n) {
                return positionIsInBounds(n.position, bounds);
            });
            return results;
        }
        return results;
    }).then((results) => {
        //filter days
        let filteredResults = [];

        results.forEach((result) => {
            let filteredSpecials = [];

            result.specials.forEach((special) => {
                const matchingDays = _.intersection(filters.days, special.days);

                if (matchingDays.length > 0) {
                    filteredSpecials.push(special);
                }
            });
            result.specials = filteredSpecials;

            if (result.specials.length > 0) {
                filteredResults.push(result);
            }
        });      

        return filteredResults;
    }).then((results) => {
        //filter time
        let filteredResults = [];

        results.forEach((result) => {
            let filteredSpecials = [];

            result.specials.forEach((special) => {
                let matchingTimes = [];
                
                special.times.forEach((time) => {
                    const filterStartTime = filters.time.start * 100;
                    let filterEndTime = filters.time.end * 100;
                    const specialStartTime = parseInt(time.start.replace(':',''), 10);
                    let specialEndTime = parseInt(time.end.replace(':',''), 10);

                    if (specialEndTime < specialStartTime) { //crosses into next day
                        specialEndTime = specialEndTime + 2400;
                    }

                    if (specialStartTime < filterEndTime && specialEndTime > filterStartTime) {
                        matchingTimes.push(special);
                    }
                });
                if (matchingTimes.length > 0) {
                    filteredSpecials.push(special);
                }                
            });
            result.specials = filteredSpecials;

            if (result.specials.length > 0) {
                filteredResults.push(result);
            }
        });      

        return filteredResults;
    });
   },

   getLocationsByCity: function(cityId) {
        return fetch(config.apiPath + '/city/' + cityId + '/locations').then((response) => response.json())
        .then((cities) => {
            // do stuff with responseJSON here...
        return cities;
        });
   },   

    postLocation: function(location, cityId) {
        return fetch(config.apiPath + '/location', {      
            method: 'post',
            body: JSON.stringify({
                name: location.name,
                address: {
                    streetAddress: location.addressStreet,
                    city: location.addressCity,
                    state: location.addressState,
                    zip: location.addressZip
                },
                position: {
                    latitude: location.positionLatitude,                
                    longitude: location.positionLongitude
                },
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

function positionIsInBounds(position, bounds) {
    if (position.latitude < bounds.ne.lat() && 
        position.latitude > bounds.sw.lat() &&
        position.longitude > bounds.sw.lng() &&
        position.longitude < bounds.ne.lng()) {
            return true;
        }
    return false;    
}

export default locationApi;