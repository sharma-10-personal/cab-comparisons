const config_keys = require("../config/config");
const axios = require("axios");

async function getGeoCode(address) {
  console.log("Fetching geocode for address:", address);

  const API_KEY = config_keys.google_maps_api_key;
  const url = `https://${
    config_keys.google_maps_api.url
  }/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log("Geocode API response received.");

    const lat_pos = response?.data?.results[0]?.geometry?.location?.lat;
    const lng_pos = response?.data?.results[0]?.geometry?.location?.lng;

    if (lat_pos && lng_pos) {
      console.log("Geocode coordinates:", {
        latitude: lat_pos,
        longitude: lng_pos,
      });
      return { latitude: lat_pos, longitude: lng_pos };
    } else {
      console.error("No coordinates found for the provided address.");
      return null;
    }
  } catch (error) {
    console.error("Error occurred while fetching geocode data:", error.message);
    return null; // Return null to indicate failure in fetching geocode
  }
}

module.exports = {
  getGeoCode,
};
