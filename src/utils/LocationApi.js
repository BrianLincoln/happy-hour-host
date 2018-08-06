import config from './../config';

const locationApi = {
  getLocations() {
    return fetch(`${config.apiPath}/locations`).then(response =>
      response.json());
  },
  getLocationsByCity(cityId) {
    return fetch(`${config.apiPath}/locations?cityId=${cityId}`).then(response => response.json());
  },
  getLocation(name) {
    return fetch(`${config.apiPath}/locations/${name}`).then(response =>
      response.json());
  },

  postLocation(location) {
    return fetch(`${config.apiPath}/locations`, {
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.authToken,
        location: {
          city: location.city,
          name: location.name,
          position: {
            latitude: location.positionLatitude,
            longitude: location.positionLongitude,
          },
          website: location.website,
          googleMapLink: location.googleMapLink,
        },
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

  updateLocation(location) {
    return fetch(`${config.apiPath}/locations/${location._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        token: localStorage.authToken,
        location: {
          _id: location._id,
          city: location.city,
          name: location.name,
          position: {
            latitude: location.positionLatitude,
            longitude: location.positionLongitude,
          },
          website: location.website,
          googleMapLink: location.googleMapLink,
        },
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
  deleteLocation(locationId) {
    return fetch(`${config.apiPath}/locations/${locationId}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.authToken,
      }),
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
  postSpecial(locationId, special) {
    return fetch(`${config.apiPath}/locations/${locationId}/specials`, {
      method: 'post',
      body: JSON.stringify({
        token: localStorage.authToken,
        special,
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
    locationId, specialId, special
  ) {
    return fetch(`${config.apiPath}/locations/${locationId}/specials/${specialId}`,
      {
        method: 'put',
        body: JSON.stringify({
          token: localStorage.authToken,
          special,
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
  deleteSpecial(locationId, specialId) {
    return fetch(`${config.apiPath}/locations/${locationId}/specials/${specialId}`,
      {
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
  rateSpecial(
    cityId, locationId, specialId, isAccurate
  ) {
    return fetch(`${
      config.apiPath
    }/city/${cityId}/location/${locationId}/special/${specialId}/rating`,
    {
      method: 'post',
      body: JSON.stringify({
        isAccurate,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => response)
      .catch((response) => {
        console.log(response);
      });
  },

  getLocationSuggestions() {
    return fetch(`${config.apiPath}/location-suggestions`).then(response =>
      response.json());
  },
  postLocationSuggestion(suggestion) {
    return fetch(`${config.apiPath}/location-suggestions`, {
      method: 'post',
      body: JSON.stringify({
        token: localStorage.authToken,
        suggestion,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .catch((res) => {
        console.log(res);
      });
  },
};

export default locationApi;
