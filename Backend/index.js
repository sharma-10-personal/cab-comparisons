const express = require('express');
const request = require('request');
const config_keys = require('./constants'); 
const axios = require('axios');
const locData = require('./samplelocation.json');
const location = require('./geocode');
const ola = require('./ola')
const uber = require('./uber');
const cors = require('cors');


const app = express();

app.use(cors());

app.get('/get-all-fares', async (req, res) => {

  //main code
  let pickup_address, drop_address, pick_coor,drop_coor, ride_coordinates = {};

  pickup_address = req.query.pickup_address ? req.query.pickup_address : '';
  drop_address   = req.query.drop_address ?  req.query.drop_address : '';

  
  pick_coor = await location.getGeoCode(pickup_address);
  drop_coor = await location.getGeoCode(drop_address);

  ride_coordinates.drop_coordinates = pick_coor;
  ride_coordinates.pickup_coordinates = drop_coor;

  try {
    // Start both requests concurrently
    const olaPricePromise = ola.getOlaPrice(ride_coordinates);
    const uberPricePromise = uber.getUberPrice(ride_coordinates);

    // Wait for both promises to resolve
    const olaPriceResponse = await olaPricePromise;
    const uberPriceResponse = await uberPricePromise;

    // Parse responses or handle them as needed
    const olaCategories = olaPriceResponse;
    const uberPrice = uberPriceResponse; // Assuming uber.getUberPrice() returns the price directly

    console.log('Ola Categories:', olaCategories);
    console.log('Uber Price:', uberPrice);

    res.send({"ola" :olaCategories, "uber" : uberPrice})
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error; // Optionally re-throw or handle the error
  }

})


// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
