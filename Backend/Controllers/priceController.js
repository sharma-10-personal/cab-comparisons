const priceServices = require("../services/priceServices");

// to get prices from cabs and auto
exports.pricesFromCab = (req, res) => {
  priceServices.getPrices(req, res);
};
