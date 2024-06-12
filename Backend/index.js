const express = require('express');
const request = require('request');
const config_keys = require('./constants'); 
const axios = require('axios');
const locData = require('./samplelocation.json');
const location = require('./geocode');
const ola = require('./ola')
const uber = require('./uber');


const app = express();


let pickup_lat, pickup_long, drop_lat, drop_long;

pickup_lat = 12.9038;
pickup_long = 77.49282;
drop_lat = 12.90731;
drop_long = 77.60117;



// Endpoint to make the Ola API request
app.get('/ola-fare', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://book.olacabs.com/data-api/category-fare/p2p?pickupLat=' + pickup_lat + '&pickupLng=' + pickup_long + '&pickupMode=NOW&leadSource=desktop_website&dropLat='+ drop_lat + '&dropLng='+ drop_long+'&silent=false',
    headers: {
      accept: 'application/json',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      cookie: '_csrf=v6l5Ntn4FIGYOYQHDc9xtW-T; XSRF-TOKEN=bIWiwrJz-VIOAZ5K1ZHKOZ9CXE54O_0J6nZg; OSRN_v1=zXuBLcqCbFsSl6_YnQ3pUmiI; AKA_A2=A; _gid=GA1.2.610457421.1717316910; _gcl_au=1.1.1345583378.1717316912; _ga_EKVXJMSBW2=GS1.2.1717316928.1.1.1717317110.60.0.0; wasc=web-2d29a65a-53f5-4471-9b6c-0b5b1b75d6da__AQECAHgfxP3kLfatAqX5D3Wm8Q4cwpCiqFMlbQIth8I9m4HyQQAAANswgdgGCSqGSIb3DQEHBqCByjCBxwIBADCBwQYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxWWFyQDm13OmD%2FonoCARCAgZNV3F2uqXnJMmQrCA24Hyv7KCGfwPvnRM%2FcUiXLEd9bwWjs%2FrVElR2iQj6vsFcda2v7hMMiiLQ2JF94rQLTmttNWd9Ekfer7z%2Fh2QrR1yb0s5ayMBqOzw4CP5E7B8DkMMKnGpaTKyg47%2B%2BsC2qvPEa04y2D4VIG8MX4vvvEDvWOZuSw7OwG9lAtNUVNXieIgJvIBgU%3D; _ga=GA1.1.220158383.1717316910; _ga_FR59878HTR=GS1.2.1717316911.1.1.1717318317.60.0.0; _ga_2TR8WHTK1X=GS1.1.1717316911.1.1.1717318760.49.0.0',
    }

  };
  
  request(options, function (error, response) {
    if (error) {
      return res.status(500).send({ error: 'Request failed' });
    }
    res.send(response.body);
  });
});



app.get('/get-all-fares', async (req, res) => {

  //main code
  // let pickup_address, drop_address, pick_coor,drop_coor, ride_coordinates = {};

  // pickup_address = req.query.pickup_address ? req.query.pickup_address : '';
  // drop_address   = req.query.drop_address ?  req.query.drop_address : '';

  
  // pick_coor = await location.getGeoCode(pickup_address);
  // drop_coor = await location.getGeoCode(drop_address);

  // ride_coordinates.drop_coordinates = pick_coor;
  // ride_coordinates.pickup_coordinates = drop_coor;
  // let ola_price = await ola.getOlaPrice(ride_coordinates);

  // console.log('------------- olaaaaaaaaaaa',JSON.parse(ola_price).data.p2p.categories);



  // res.send(ola_price);

    


  //  }) 

   

})


// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
