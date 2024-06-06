const config_keys = require('./constants'); 
const axios = require('axios');
const locData = require('./samplelocation.json');
const location = require('./geocode');


async function getGeoCode (address) {

    let lat_pos, lng_pos;

    address = address ? address : 'gopalan arcade';
    let API_KEY = config_keys.google_maps_api_key;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  
    try {
  
        let response = await axios.get(url);
  
        lat_pos = response?.data?.results[0]?.geometry?.location?.lat;
        lng_pos = response?.data?.results[0]?.geometry?.location?.lng;
        console.log(lat_pos, lng_pos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the geocode data' });
    }

    let coordinates = {
        'latitude' : lat_pos,
        'longitude': lng_pos
    }

    return coordinates;

}

module.exports = {
    getGeoCode
}