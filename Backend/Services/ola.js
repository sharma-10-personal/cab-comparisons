const { default: axios } = require("axios");
const { ola_equivalents, ola_cookie_key } = require("../config/config");
const constants = require("../config/config");

async function getOlaPrice (ride_coordinates) {

  let pickup_lat = ride_coordinates.pickup_coordinates.latitude;
  let pickup_long = ride_coordinates.pickup_coordinates.longitude;
  let drop_lat = ride_coordinates.drop_coordinates.latitude;
  let drop_long = ride_coordinates.drop_coordinates.longitude;      
 
  let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://book.olacabs.com/data-api/category-fare/p2p?pickupLat='+pickup_lat+'&pickupLng='+pickup_long+'&pickupMode=NOW&leadSource=desktop_website&dropLat='+drop_lat+'&dropLng='+drop_long+'&silent=false',
  headers: { 
    'accept': 'application/json', 
    'accept-language': 'en-US,en;q=0.9', 
    'content-type': 'application/json', 
    'cookie': constants.ola_cookie_key,
  }};
try {
let final_result = await axios(config);
console.log(final_result.data);
let final_value = final_result.data.data.p2p.categories;

console.log('++++++++++++++++++++', final_value, typeof final_value);
let replaced_fare ={};
for (const key in final_value) {
  replaced_fare[ola_equivalents[key]]  =  { "price" :final_value[key]['price']}
}

console.log('------------------', replaced_fare)

return replaced_fare;
} catch(error) {
  console.log(error);
}
}

module.exports = {
    getOlaPrice
}