const axios = require("axios");
const { uber_equivalents } = require("../config/config");
const constants = require("../config/config");

async function getUberPrice(ride_coordinates) {
  let pickup_lat = ride_coordinates.pickup_coordinates.latitude;
  let pickup_long = ride_coordinates.pickup_coordinates.longitude;
  let drop_lat = ride_coordinates.drop_coordinates.latitude;
  let drop_long = ride_coordinates.drop_coordinates.longitude;

  let cab_prices, auto_prices;
  let data = JSON.stringify({
    query: `query Products($destinations: [InputCoordinate!]!, $includeRecommended: Boolean = false, $pickup: InputCoordinate!, $pickupFormattedTime: String, $profileType: String, $profileUUID: String, $returnByFormattedTime: String, $stuntID: String, $targetProductType: EnumRVWebCommonTargetProductType) {
      products(
        destinations: $destinations
        includeRecommended: $includeRecommended
        pickup: $pickup
        pickupFormattedTime: $pickupFormattedTime
        profileType: $profileType
        profileUUID: $profileUUID
        returnByFormattedTime: $returnByFormattedTime
        stuntID: $stuntID
        targetProductType: $targetProductType
      ) {
        ...ProductsFragment
        __typename
      }
    }
    
    fragment ProductsFragment on RVWebCommonProductsResponse {
      classificationFilters {
        ...ClassificationFiltersFragment
        __typename
      }
      defaultVVID
      hourlyTiersWithMinimumFare {
        ...HourlyTierFragment
        __typename
      }
      intercity {
        ...IntercityFragment
        __typename
      }
      links {
        iFrame
        text
        url
        __typename
      }
      productsUnavailableMessage
      renderRankingInformation
      tiers {
        ...TierFragment
        __typename
      }
      __typename
    }
    
    fragment BadgesFragment on RVWebCommonProductBadge {
      color
      text
      __typename
    }
    
    fragment ClassificationFiltersFragment on RVWebCommonClassificationFilters {
      filters {
        ...ClassificationFilterFragment
        __typename
      }
      hiddenVVIDs
      standardProductVVID
      __typename
    }
    
    fragment ClassificationFilterFragment on RVWebCommonClassificationFilter {
      currencyCode
      displayText
      fareDifference
      icon
      vvid
      __typename
    }
    
    fragment HourlyTierFragment on RVWebCommonHourlyTier {
      description
      distance
      fare
      fareAmountE5
      farePerHour
      minutes
      packageVariantUUID
      preAdjustmentValue
      __typename
    }
    
    fragment IntercityFragment on RVWebCommonIntercityInfo {
      oneWayIntercityConfig(destinations: $destinations, pickup: $pickup) {
        ...IntercityConfigFragment
        __typename
      }
      roundTripIntercityConfig(destinations: $destinations, pickup: $pickup) {
        ...IntercityConfigFragment
        __typename
      }
      __typename
    }
    
    fragment IntercityConfigFragment on RVWebCommonIntercityConfig {
      description
      onDemandAllowed
      reservePickup {
        ...IntercityTimePickerFragment
        __typename
      }
      returnBy {
        ...IntercityTimePickerFragment
        __typename
      }
      __typename
    }
    
    fragment IntercityTimePickerFragment on RVWebCommonIntercityTimePicker {
      bookingRange {
        maximum
        minimum
        __typename
      }
      header {
        subTitle
        title
        __typename
      }
      __typename
    }
    
    fragment TierFragment on RVWebCommonProductTier {
      products {
        ...ProductFragment
        __typename
      }
      title
      __typename
    }
    
    fragment ProductFragment on RVWebCommonProduct {
      badges {
        ...BadgesFragment
        __typename
      }
      capacity
      cityID
      currencyCode
      description
      detailedDescription
      discountPrimary
      displayName
      estimatedTripTime
      etaStringShort
      fare
      fareAmountE5
      fares {
        capacity
        discountPrimary
        fare
        fareAmountE5
        hasPromo
        hasRidePass
        meta
        preAdjustmentValue
        __typename
      }
      hasPromo
      hasRidePass
      hourly {
        tiers {
          ...HourlyTierFragment
          __typename
        }
        overageRates {
          ...HourlyOverageRatesFragment
          __typename
        }
        __typename
      }
      id
      is3p
      isAvailable
      legalConsent {
        ...ProductLegalConsentFragment
        __typename
      }
      meta
      parentProductUuid
      preAdjustmentValue
      productImageUrl
      productUuid
      reserveEnabled
      __typename
    }
    
    fragment ProductLegalConsentFragment on RVWebCommonProductLegalConsent {
      header
      image {
        url
        width
        __typename
      }
      description
      enabled
      ctaUrl
      ctaDisplayString
      buttonLabel
      showOnce
      __typename
    }
    
    fragment HourlyOverageRatesFragment on RVWebCommonHourlyOverageRates {
      perDistanceUnit
      perTemporalUnit
      __typename
    }`,
    variables: {
      includeRecommended: false,
      destinations: [{ latitude: drop_lat, longitude: drop_long }],
      pickup: { latitude: pickup_lat, longitude: pickup_long },
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://m.uber.com/go/graphql",
    headers: {
      cookie: constants.uber_cookie_key,
      "x-csrf-token": "x",
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    console.log("Sending request to Uber API...");
    let uber_response = await axios.request(config);

    auto_prices = uber_response.data.data.products.tiers[0].products[0].fare;
    cab_prices = uber_response.data.data.products.tiers[1].products;

    let product_val = cab_prices.reduce((all_prices, item) => {
      if (item.hasOwnProperty("description") && item.hasOwnProperty("fare")) {
        if (!all_prices) {
          all_prices = {};
        }

        switch (item.description) {
          case "UberXL":
          case "Premier":
          case "Go Sedan":
          case "UberXS":
          case "Uber Go":
            all_prices[uber_equivalents[item.description]] = {
              price: item.fare,
            };
            break;
        }
      }
      all_prices["Auto"] = { price: auto_prices };
      return all_prices;
    }, {});
    console.log("Uber prices processed successfully:", product_val);

    return product_val;
  } catch (error) {
    console.error("Error fetching Uber prices:", error.message);
    throw error;
  }
}

module.exports = { getUberPrice };
