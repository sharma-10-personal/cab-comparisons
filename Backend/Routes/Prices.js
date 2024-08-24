const express = require("express");
const { getPricesFromCab } = require("../Controllers/PriceController");

const router = express.Router();

console.log("Initializing routes...");

router.get("/get-fares", (req, res) => {
  console.log("Received GET request on /get-fares");
  getPricesFromCab(req, res);
});

console.log("Routes initialized successfully.");

module.exports = router;
