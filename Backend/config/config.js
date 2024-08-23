require("dotenv").config();

module.exports = {
  google_maps_api_key: process.env.GOOGLE_API_KEY,
  uber_cookie_key: process.env.UBER_KEY,
  ola_cookie_key: process.env.OLA_KEY,
  uber_equivalents: {
    UberXL: "Suv",
    Premier: "Sedan",
    UberXS: "Hatchback",
  },
  ola_equivalents: {
    prime: "Sedan",
    mini: "Hatchback",
    suv: "Suv",
    auto: "Auto",
  },
  google_maps_api: {
    url: "maps.googleapis.com",
  },
  ola: {
    url: "book.olacabs.com",
  },
};
