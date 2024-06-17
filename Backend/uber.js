const axios = require('axios');
const { uber_equivalents } = require('./constants');



async function getUberPrice (ride_coordinates) {

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
      variables: {"includeRecommended":false,"destinations":[{"latitude":drop_lat,"longitude":drop_long}],"pickup":{"latitude":pickup_lat,"longitude":pickup_long}}
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://m.uber.com/go/graphql',
      headers: { 
        'cookie': 'marketing_vistor_id=d3ca65fb-dea2-4932-b3c0-0bd6e2b4db57; udi-id=kHN457AJ7NPqFPDsR+M1NKrk9KAD37SZLbbYVMEMkf8aMqW/kTzhn55hnyd/ZCp7z24V+3UDjGQs98yXYM6qXc+PFQzrK5ckTqxAm/iZeqCMBcZ6lUIlUa2ERL3GkmZR6is6HrjMYdoREyM2HMQFM0NB0VgzQFgVT6iRFZZ5OGnE8Ms8nn3/q8ttBWLL+5xF3Wn0ynhy++fosZ45noYeeg==inKNQ3vWS07KQCQcLLdisg==qgL8DA+iVJmJKxyzeoZ/hlx5gUDjGZ1fs8gXJOJ7A3s=; sid=QA.CAESEAKo7Jy1wEoHrOUj8L1Wqy0YsPGOtAYiATEqJDIxZTk2NDI3LTRjOGItNGZhYy1hNzdlLThlYWY3MWVhNzNmZDJAONyWfRB8BzSunV8uZN7BCgr8N4QCkmIdDsKm-wGg-1GKg1RqK3UyQyFUz5u7Fdanbme2NaVybU98Z4mgW9OibDoBMUIIdWJlci5jb20.dNzdFwD37HVguLst8GoSDtSdJxRdiImXG5FZEHi9Vow; _ga_DKGN4Z56QF=GS1.1.1717335951.3.1.1717335952.0.0.0; x-uber-analytics-session-id=6fe6c3ee-fb88-4600-9b11-e8b62a28521c; utag_main__sn=1; utag_main_ses_id=1718222728368%3Bexp-session; segmentCookie=a; utag_main_segment=a; utag_geo_code=US; utag_main_optimizely_segment=a; CONSENTMGR=c1:1%7Cc2:1%7Cc3:1%7Cc4:1%7Cc5:1%7Cc6:1%7Cc7:1%7Cc8:1%7Cc9:1%7Cc10:1%7Cc11:1%7Cc12:1%7Cc13:1%7Cc14:1%7Cc15:1%7Cts:1718222728578%7Cconsent:true; utag_main__ss=0%3Bexp-session; _hjSession_960703=eyJpZCI6IjcwNWUwMGU5LWUxODktNDI3Ny1iYmZhLWI2ZWNhYWE4YTMzNSIsImMiOjE3MTgyMjI3MzAwMzEsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MX0=; _gid=GA1.2.1373379630.1718222731; csid=1.1720814778721.bn5O69sS5vlezn/kgkR86MwLw8O1/kC+55rbgaLZPPs=; _ua={"session_id":"c7e46891-2a43-48ba-9170-dcd2ce4e8b6d","session_time_ms":1718222779586}; _cc=ASZ2MKoxadSeWJsYKK5%2B0EV3; _cid_cc=ASZ2MKoxadSeWJsYKK5%2B0EV3; udi-fingerprint=UQ7jQ3FFZl81GPxYB45rJjLfXho5r8bsl2fUQnwf06uBqv+K/l05hye/zmpOeEF+y8wSCi7jSqUDLuRW+oRHoA==4qCKJG94kSqKK82EhezNQBQT1kNTkm+8mLofqz+2IgA=; mp_adec770be288b16d9008c964acfba5c2_mixpanel=%7B%22distinct_id%22%3A%20%2273344814-b24f-49fa-b61f-61867ae0302d%22%2C%22%24device_id%22%3A%20%2218fd8069a3c34d-0e4033e172c95c-26001c51-1fa400-18fd8069a3d89e%22%2C%22%24search_engine%22%3A%20%22yahoo%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fsearch.yahoo.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22search.yahoo.com%22%2C%22%24user_id%22%3A%20%2273344814-b24f-49fa-b61f-61867ae0302d%22%7D; _hjSessionUser_960703=eyJpZCI6IjNjMmIzNjE3LTFhNTUtNWIyMy05NGU5LTc5NmY3ZDYxOTE1YiIsImNyZWF0ZWQiOjE3MTgyMjI3MzAwMzAsImV4aXN0aW5nIjp0cnVlfQ==; _ga=GA1.2.1003023746.1717316262; _gat_gtag_UA_7157694_35=1; jwt-session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlc3Npb25fdHlwZSI6ImRlc2t0b3Bfc2Vzc2lvbiIsIlVzZXItQWdlbnQiOiIiLCJ4LXViZXItY2xpZW50LWlkIjoiIiwieC11YmVyLWRldmljZSI6IiIsIngtdWJlci1jbGllbnQtdXNlci1zZXNzaW9uLWlkIjoiIiwidGVuYW5jeSI6InViZXIvcHJvZHVjdGlvbiJ9LCJpYXQiOjE3MTgyMjI5NzAsImV4cCI6MTcxODMwOTM3MH0.J2HEouF2AoM-rf8tt2Jsb_wXRGTbwraxtxQvwZkYZGw; _ga_XTGQLY6KPT=GS1.1.1718222730.1.1.1718222970.0.0.0; utag_main__pn=4%3Bexp-session; utag_main__se=11%3Bexp-session; utag_main__st=1718224770871%3Bexp-session; marketing_vistor_id=d3ca65fb-dea2-4932-b3c0-0bd6e2b4db57; udi-id=3C98zesItOXcyaYo4PHG6XrddVgryHfMwT2yTEhGEk0Be37h6KeNx12LDdtJ5W36yQpnKVnRmnEy/4RM2VBUMabEQz2WUrIKhp/vz+DFR9qTHokQHNtv4dEsqWxBZEjnHDZMr1t2xJXgZxyO3mW6vvAx9KI4xFNRNII7cJ5oUhq6qMKaCrrqdbYz99semqfYTLyd7AsbQeqyVB/6qQmafQ==py03Y9ohJ8kFkdfYepctqQ==xCaYVqa3v+l3iqEzDIelgspcPjMBa3vpTG0BM8SyAME=; _ua={"session_id":"c7e46891-2a43-48ba-9170-dcd2ce4e8b6d","session_time_ms":1718222779586}; jwt-session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyMjM0NDMsImV4cCI6MTcxODMwOTg0M30.wN8m_93kPtFkKOo0KeC1B4Grw7IAsKzHge17YN52AO8', 
        'x-csrf-token': 'x', 
        'Content-Type': 'application/json'
      },
      data : data
    };
  
   try{ 
    let uber_response = await axios.request(config)


    auto_prices = uber_response.data.data.products.tiers[0].products[0].fare;

    cab_prices = uber_response.data.data.products.tiers[1].products;

       let product_val = cab_prices.reduce((all_prices, item) => {
        if(item.hasOwnProperty('description') && item.hasOwnProperty('fare')) {

            if(!all_prices) {
                all_prices ={};
            }
     
            switch (item.description) {
              case "UberXL":
              case "Premier":
              case "Go Sedan":
              case "UberXS":
                all_prices[uber_equivalents[item.description]] = { "price" : item.fare};
                break;
            }
        }
        all_prices["Auto"] = {"price" : auto_prices }
        return all_prices;
       },{})
      console.log('aaaaaa',product_val);
      // console.log(response.data.data.products.tiers[1].products);
      return product_val;
      }
    catch(error)  {
      console.log(error);
      throw error;
    };

}

module.exports = {getUberPrice};