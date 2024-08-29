# Cab Comparison Project

This project compares cab fares between Ola and Uber using Google Geocode APIs for address handling and Ola and Uber ride fetch APIs for fare estimates. The results are displayed on a frontend using HTML, CSS, and JavaScript.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fetches cab fare estimates from Ola and Uber based on user-provided pickup and drop addresses.
- Uses Google Geocode APIs to convert addresses into geographical coordinates.
- Displays fare estimates in a user-friendly table format.
- Responsive frontend design with HTML, CSS, and JavaScript.

## Technologies Used

- **Node.js**: For server-side operations and API handling.
- **Async Functions & Promises**: For managing asynchronous API requests and responses.
- **Google Geocode API**: For converting addresses into geographical coordinates.
- **Ola API**: For fetching fare estimates from Ola.
- **Uber API**: For fetching fare estimates from Uber.
- **HTML**: For structuring the frontend.
- **CSS**: For styling the frontend.
- **JavaScript**: For handling API requests and updating the UI.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sharma-10-personal/cab-comparisons
   cd Backend

2. **Install Dependencies**

    Ensure you have Node.js installed. Install the necessary packages:
    ```bash
    npm install


3. **Configure Environment Variables**

    Obtain a Google API key for Geocode services.
    Get the cookies for Ola and Uber by logging into your accounts.
    Create a .env file in the root directory with the following content as shown in .env.example:

    ```bash
    GOOGLE_API_KEY=your_google_api_key
    UBER_KEY=your_uber_cookie
    OLA_KEY=your_ola_cookie

    Run the Project

4. **Start the server**

    ```bash
    npm start
    
    Open the index.html file in your web browser to view the application.
