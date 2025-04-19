# CrUX Analyzer

This application allows users to analyze Chrome User Experience (CrUX) data for multiple URLs. It provides insights into key web performance metrics like LCP, FID, CLS, and TTFB.

## Features

- Input single or multiple URLs for analysis
- View performance metrics in a tabular format
- Filter data based on specific metrics and thresholds
- Sort results by any metric
- View summary statistics (average, sum, min, max) for all metrics

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Google Cloud Platform account with CrUX API enabled

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with your CrUX API key:

   ```
   CRUX_API_KEY=your_api_key_here
   PORT=5001
   ```

4. Start the backend server:
   ```
   node server.js
   ```

### Frontend Setup

1. From the project root directory, install dependencies:

   ```
   npm install
   ```

2. Start the React development server:

   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## How to Get a CrUX API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Library"
4. Search for "Chrome UX Report API" and enable it
5. Go to "APIs & Services" > "Credentials"
6. Create an API key and copy it
7. Paste the API key in the `.env` file

## Usage

1. Enter one or more URLs in the input fields
2. Click the "Search" button to fetch CrUX data
3. Use the filter controls to filter results based on specific metrics
4. Click on column headers to sort the data
5. View summary statistics in the expandable section above the table

## Known Issues

- The CrUX API might not have data for all URLs, especially for less popular websites
- The API has rate limits that may affect usage with many URLs
- TTFB is approximated using First Contentful Paint data as the CrUX API doesn't directly provide TTFB

## Next Steps

- Add data visualization with charts
- Implement historical data tracking
- Add recommendations based on performance scores
- Improve error handling and user feedback
- Add export functionality for reports
