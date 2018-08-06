import config from './../config';

function encode(string) {
  return encodeURIComponent(string)
    .trim()
    .replace(/%20/g, '-');
}

const pathHelpers = {
  locationPath(
    locationId, cityName, locationName
  ) {
    return `/locations/${locationId}/${encode(cityName)}/${encode(locationName)}`;
  },

  redirectPage(newPath) {
    console.log('rediurect to: ', newPath);

    return fetch(`${config.apiPath}/301`, {
      method: 'POST',
      body: JSON.stringify({
        newPath,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  },
};
export default pathHelpers;
