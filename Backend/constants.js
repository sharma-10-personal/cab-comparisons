require('dotenv').config()

module.exports ={
    google_maps_api_key : process.env.GOOGLE_API_KEY || 'xyx',
    uber_equivalents : {
    "UberXL": "Suv",
    "Premier": "Sedan",
    "Go Sedan": "Luxurious Sedan",
    "UberXS": "Hatchback"
    },
    ola_equivalents : {
        "prime" : "Luxurious Sedan",
        "mini" : "Hatchback",
        "suv"  : "Suv",
        "auto" : "Auto"
    }
}
