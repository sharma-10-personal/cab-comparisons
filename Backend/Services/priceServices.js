const location = require("./geocode");
const ola = require("./ola");
const uber = require("./uber");

async function getPrices(req, res) {
  console.log("Started processing price request.");

  let pickup_address = req.query.pickup_address || "";
  let drop_address = req.query.drop_address || "";
  let ride_coordinates = {};

  try {
    console.log("Getting geocodes for pickup and drop addresses.");
    const pick_coor = await location.getGeoCode(pickup_address);
    const drop_coor = await location.getGeoCode(drop_address);

    ride_coordinates = {
      pickup_coordinates: pick_coor,
      drop_coordinates: drop_coor,
    };

    console.log("Geocodes retrieved:", ride_coordinates);

    console.log("Fetching prices from Ola and Uber...");
    const [olaPriceResponse, uberPriceResponse] = await Promise.all([
      ola.getOlaPrice(ride_coordinates),
      uber.getUberPrice(ride_coordinates),
    ]);

    console.log("Prices fetched successfully.");
    res.send({ ola: olaPriceResponse, uber: uberPriceResponse });
  } catch (error) {
    console.error("Error fetching prices:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = { getPrices };
