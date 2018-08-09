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
};
export default pathHelpers;
