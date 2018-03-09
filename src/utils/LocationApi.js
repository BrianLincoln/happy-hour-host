import config from './../config';

// TEMP -- this should get dynamic once there are multiple cities
const minneapoliscityId = '5a92e61f5afd0826f0e5a7a6';

const locationApi = {
  getLocations() {
    return fetch(`${config.apiPath}/city/${minneapoliscityId}/locations`).then(response =>
      response.json());
  },
  getLocationsByCity(city) {
    return fetch(`${config.apiPath}/city/${city}/locations`)
      .then(response => response.json())
      .then(cities =>
        // do stuff with responseJSON here...
        cities);
  },
  getLocation(cityId, locationId) {
    return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}`).then(response =>
      response.json());
  },
  getLocationByDisplayNames(cityName, locationName) {
    return fetch(`${config.apiPath}/city-name/${cityName}/location-name/${locationName}`)
      .then(response => response.json())
      .then(location =>
        // do stuff with responseJSON here...
        location);
  },
  postLocation(cityId, location) {
    return fetch(`${config.apiPath}/city/${cityId}/location`, {
      method: 'post',
      body: JSON.stringify({
        name: location.name,
        position: {
          latitude: location.positionLatitude,
          longitude: location.positionLongitude,
        },
        website: location.website,
        googleMapLink: location.googleMapLink,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  updateLocation(cityId, location) {
    return fetch(`${config.apiPath}/city/${cityId}/location/${location._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        _id: location._id,
        name: location.name,
        position: {
          latitude: location.positionLatitude,
          longitude: location.positionLongitude,
        },
        website: location.website,
        googleMapLink: location.googleMapLink,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  deleteLocation(cityId, locationId) {
    return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  postSpecial(
    cityId, locationId, special
  ) {
    return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}/special`, {
      method: 'post',
      body: JSON.stringify({
        ...special,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  updateSpecial(
    cityId, locationId, specialId, special
  ) {
    return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}/special/${specialId}`, {
      method: 'put',
      body: JSON.stringify({
        special,
        specialId,
        locationId,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  deleteSpecial(
    cityId, locationId, specialId
  ) {
    return fetch(`${config.apiPath}/city/${cityId}/location/${locationId}/special/${specialId}`, {
      method: 'delete',
    })
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  },
};

export default locationApi;
