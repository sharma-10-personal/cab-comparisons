const priceServices = require("../services/priceServices");

// Get prices from cabs and autos
exports.getPricesFromCab = async (req, res) => {
  console.log("Processing request for cab prices.");

  try {
    console.log("Calling price service...");
    await priceServices.getPrices(req, res);
    console.log("Response sent successfully.");
  } catch (error) {
    console.error("Error fetching prices:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
