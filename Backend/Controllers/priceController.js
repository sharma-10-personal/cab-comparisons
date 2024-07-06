const priceServices = require('../Services/priceServices')


exports.pricesFromCab = (req, res) => {
    priceServices.getPrices(req, res);
}
