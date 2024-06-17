const { default: axios } = require("axios");
const { ola_equivalents } = require("./constants");

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
    'cookie': '_csrf=v6l5Ntn4FIGYOYQHDc9xtW-T; XSRF-TOKEN=bIWiwrJz-VIOAZ5K1ZHKOZ9CXE54O_0J6nZ; OSRN_v1=zXuBLcqCbFsSl6_YnQ3pUmiI; AKA_A2=A; _gid=GA1.2.610457421.1717316910; _gcl_au=1.1.1345583378.1717316912; _ga_EKVXJMSBW2=GS1.2.1717316928.1.1.1717317110.60.0.0; wasc=web-2d29a65a-53f5-4471-9b6c-0b5b1b75d6da__AQECAHgfxP3kLfatAqX5D3Wm8Q4cwpCiqFMlbQIth8I9m4HyQQAAANswgdgGCSqGSIb3DQEHBqCByjCBxwIBADCBwQYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxWWFyQDm13OmD%2FonoCARCAgZNV3F2uqXnJMmQrCA24Hyv7KCGfwPvnRM%2FcUiXLEd9bwWjs%2FrVElR2iQj6vsFcda2v7hMMiiLQ2JF94rQLTmttNWd9Ekfer7z%2Fh2QrR1yb0s5ayMBqOzw4CP5E7B8DkMMKnGpaTKyg47%2B%2BsC2qvPEa04y2D4VIG8MX4vvvEDvWOZuSw7OwG9lAtNUVNXieIgJvIBgU%3D; _ga=GA1.1.220158383.1717316910; _ga_FR59878HTR=GS1.2.1717316911.1.1.1717318317.60.0.0; _ga_2TR8WHTK1X=GS1.1.1717316911.1.1.1717318760.49.0.0; OSRN_v1=BT0s6c7bfyEND82Kghzd3P96; wasc=web-52540907-e5ae-4422-9e41-d85435ecf9ba__AQECAHgfxP3kLfatAqX5D3Wm8Q4cwpCiqFMlbQIth8I9m4HyQQAAANswgdgGCSqGSIb3DQEHBqCByjCBxwIBADCBwQYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxznHe0B%2BnOcFqZJ9ICARCAgZNgVTMAisRvIRap4DZCa8Mi2kVyCUaMVNk4eVqmyNNj5HJnR8Z1azyF01HkCYeWDAyFoyToEnEejButOygaZ55W1JOkRxJzY9CPV0NT4i3Sw08bxnc7gZeGP3sjT0Ae7%2B4uNHrQ1HDlZppJGdeWPtX9Jra4%2BUiud1%2FKqVFJFEROMTZyJh3DN%2B9i9FCDxcWjywHwy1s%3D'
  }
};
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