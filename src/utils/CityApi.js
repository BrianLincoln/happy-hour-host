import config from './../config';

// TEMP -- this should get dynamic once there are multiple cities
const minneapoliscityId = '5a92e61f5afd0826f0e5a7a6';

const cityApi = {
  getCities() {
    return fetch(`${config.apiPath}/cities`)
      .then(response => response.json())
      .then(city =>
        // do stuff with responseJSON here...
        city);
  },
  // defaulting to mpls for now
  getCity(cityId = minneapoliscityId) {
    return fetch(`${config.apiPath}/city/${cityId}`)
      .then(response => response.json())
      .then(city =>
        // do stuff with responseJSON here...
        city);
  },
  postCity(name) {
    return fetch(`${config.apiPath}/city`, {
      method: 'post',
      body: JSON.stringify({
        name,
        token: localStorage.authToken,
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
  deleteCity(_id) {
    return fetch(`${config.apiPath}/city`, {
      method: 'delete',
      body: JSON.stringify({
        _id,
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
  getNeighborhoods(cityId) {
    return fetch(`${config.apiPath}/city/${cityId}/neighborhoods`)
      .then(response => response.json())
      .then(neighborhoods =>
        // do stuff with responseJSON here...
        neighborhoods);
  },
  getNeighborhood(cityId, neighborhoodId) {
    return fetch(`${config.apiPath}/city/${cityId}/neighborhood/${neighborhoodId}`)
      .then(response => response.json())
      .then(neighborhood =>
        // do stuff with responseJSON here...
        neighborhood);
  },
  getNeighborhoodByDisplayNames(cityName, neighborhoodName) {
    return fetch(`${config.apiPath}/city-name/${cityName}/neighborhood-name/${neighborhoodName}`)
      .then(response => response.json())
      .then(neighborhood =>
        // do stuff with responseJSON here...
        neighborhood);
  },
  postNeighborhood(cityId, neighborhood) {
    return fetch(`${config.apiPath}/city/${cityId}/neighborhood`, {
      method: 'post',
      body: JSON.stringify({
        neighborhood,
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
  updateNeighborhood(
    neighborhood, cityId, neighborhoodId
  ) {
    return fetch(`${config.apiPath}/city/${cityId}/neighborhood/${neighborhoodId}`, {
      method: 'put',
      body: JSON.stringify({
        neighborhood,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => response);
  },
  deleteNeighborhood(cityId, neighborhoodId) {
    return fetch(`${config.apiPath}/city/${cityId}/neighborhood/${neighborhoodId}`, {
      method: 'delete',
      body: JSON.stringify({
        _id: neighborhoodId,
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
};

export default cityApi;
