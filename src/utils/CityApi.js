import config from '../config';

// TEMP -- this should get dynamic once there are multiple cities
const minneapoliscityId = '5b490c5b7781014240dd2ffa';

const cityApi = {
  getCities() {
    return fetch(`${config.apiPath}/cities`)
      .then(response => response.json())
      .then(city => city);
  },
  // defaulting to mpls for now
  getCity(cityId = minneapoliscityId) {
    return fetch(`${config.apiPath}/cities/${cityId}`)
      .then(response => response.json())
      .then(city => city);
  },
  postCity(name) {
    return fetch(`${config.apiPath}/cities`, {
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
  deleteCity(cityId) {
    return fetch(`${config.apiPath}/cities/${cityId}`, {
      method: 'delete',
      body: JSON.stringify({
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
  // --------------------- //
  // TODO Move out of here to a new file //
  // --------------------- //
  getNeighborhoods(cityId) {
    return fetch(`${config.apiPath}/cities/${cityId}/neighborhoods`)
      .then(response => response.json())
      .then(neighborhoods => neighborhoods);
  },
  getNeighborhood(cityId, neighborhoodId) {
    return fetch(`${config.apiPath}/cities/${cityId}/neighborhoods/${neighborhoodId}`)
      .then(response => response.json())
      .then(neighborhood => neighborhood);
  },
  postNeighborhood(cityId, neighborhood) {
    return fetch(`${config.apiPath}/cities/${cityId}/neighborhoods`, {
      method: 'post',
      body: JSON.stringify({
        neighborhood,
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
  updateNeighborhood(
    neighborhood, cityId, neighborhoodId
  ) {
    return fetch(`${config.apiPath}/cities/${cityId}/neighborhoods/${neighborhoodId}`,
      {
        method: 'put',
        body: JSON.stringify({
          token: localStorage.authToken,
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
    return fetch(`${config.apiPath}/cities/${cityId}/neighborhoods/${neighborhoodId}`,
      {
        method: 'delete',
        body: JSON.stringify({
          token: localStorage.authToken,
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
