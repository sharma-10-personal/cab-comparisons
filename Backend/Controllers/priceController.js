const priceServices = require('../services/priceServices')


exports.pricesFromCab = (req, res) => {
    priceServices.getPrices(req, res);
}
