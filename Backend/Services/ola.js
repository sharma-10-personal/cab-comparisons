const axios = require("axios");
const { ola_equivalents, ola_cookie_key, ola } = require("../config/config");

async function getOlaPrice(ride_coordinates) {
  console.log("Fetching Ola prices for ride coordinates:", ride_coordinates);

  const pickup_lat = ride_coordinates.pickup_coordinates.latitude;
  const pickup_long = ride_coordinates.pickup_coordinates.longitude;
  const drop_lat = ride_coordinates.drop_coordinates.latitude;
  const drop_long = ride_coordinates.drop_coordinates.longitude;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://${ola.url}/data-api/category-fare/p2p?pickupLat=${pickup_lat}&pickupLng=${pickup_long}&pickupMode=NOW&leadSource=desktop_website&dropLat=${drop_lat}&dropLng=${drop_long}&silent=false`,
    headers: {
      cookie: ola_cookie_key,
    },
  };

  try {
    console.log("Sending request to Ola API...");
    const response = await axios(config);
    const final_value = response.data.data.p2p.categories;
    console.log("Ola API response received.");

    const replaced_fare = {};

    for (const key in final_value) {
      replaced_fare[ola_equivalents[key]] = {
        price: final_value[key]["price"],
      };
    }

    console.log("Ola prices processed successfully:", replaced_fare);
    return replaced_fare;
  } catch (error) {
    console.error("Error fetching Ola prices:", error.message);
    return null; // Return null to indicate failure in fetching prices
  }
}

module.exports = {
  getOlaPrice,
};
