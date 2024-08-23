const express = require("express");
const location = require("./geocode");
const ola = require("./ola");
const uber = require("./uber");
const cors = require("cors");

async function getPrices(req, res) {
  //main code
  let pickup_address,
    drop_address,
    pick_coor,
    drop_coor,
    ride_coordinates = {};

  pickup_address = "whitefield"; //req.query.pickup_address ? req.query.pickup_address : "";
  drop_address = "Mahaveer galaxy"; //req.query.drop_address ? req.query.drop_address : "";

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
    const uberCategories = uberPriceResponse; // Assuming uber.getUberPrice() returns the price directly

    res.send({ ola: olaCategories, uber: uberCategories });
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw error; // Optionally re-throw or handle the error
  }
}

module.exports = { getPrices };
