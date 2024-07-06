// import fetch from 'node-fetch';
const config_keys = require('./constants'); 
const express = require('express');
const axios = require('axios');
const app = express();



app.get('/geocode', async (req, res) => {
  
  const address = req.query.address || 'gopalan arcade';
  let API_KEY = config_keys.google_maps_api_key;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;

  try {

      let response = await axios.get(url);

      let lat_pos = response?.data?.results[0]?.geometry?.location?.lat;
      let lng_pos = response?.data?.results[0]?.geometry?.location?.lng;

      console.log(lat_pos, lng_pos);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the geocode data' });
  }
});



// curl --location 'https://maps.googleapis.com/maps/api/geocode/json?address=gopalan%20arcade&key=API_KEY'





























// Function to fetch latitude and longitude from a location using Google Maps Geocoding API
// const getLatLng = async (location) => {
//   const apiKey = process.env.GOOGLE_API_KEY
//   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     if (data.status === 'OK' && data.results.length > 0) {
//       const result = data.results[0];
//       const { lat, lng } = result.geometry.location;
//       return { latitude: lat, longitude: lng };
//     } else {
//       throw new Error('Geocoding API request failed or no results found');
//     }
//   } catch (error) {
//     console.error('Error fetching geolocation:', error);
//     return null;
//   }
// };

// // Example usage
// const location = 'New York City';
// const coords = await getLatLng(location);
// if (coords) {
//   console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
// } else {
//   console.log('Failed to fetch coordinates for the location.');
// }
