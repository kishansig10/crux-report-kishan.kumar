const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Basic middleware
app.use(express.json());

// Set up CORS - simple version
app.use(cors());

// CrUX API endpoint
const CRUX_API_URL =
  "https://chromeuxreport.googleapis.com/v1/records:queryRecord";

// Helper function to format data from CrUX API
const formatCruxData = (url, data) => {
  try {
    // Extract metrics from the CrUX API response
    const metrics = data.record.metrics;

    // Extract key web vitals
    const lcp = metrics.largest_contentful_paint?.percentiles.p75 || 0;
    const fid = metrics.first_input_delay?.percentiles.p75 || 0;
    const cls = metrics.cumulative_layout_shift?.percentiles.p75 || 0;
    const ttfb = metrics.first_contentful_paint?.percentiles.p75 || 0;

    return {
      url,
      LCP: lcp,
      FID: fid,
      CLS: cls,
      TTFB: ttfb,
    };
  } catch (error) {
    console.error(`Error formatting data for ${url}:`, error);
    return {
      url,
      LCP: 0,
      FID: 0,
      CLS: 0,
      TTFB: 0,
      error: "Failed to process metrics",
    };
  }
};

// API route to get CrUX data
app.post("/api/crux", async (req, res) => {
  try {
    const { urls } = req.body;

    if (!urls || urls.length === 0) {
      return res.status(400).json({ error: "Please provide at least one URL" });
    }

    // Check if API key is available
    if (!process.env.CRUX_API_KEY) {
      return res.status(500).json({ error: "CrUX API key is not configured" });
    }

    // Make parallel requests to CrUX API for each URL
    const requests = urls.map(async (url) => {
      try {
        const response = await axios.post(
          `${CRUX_API_URL}?key=${process.env.CRUX_API_KEY}`,
          { url }
        );

        return formatCruxData(url, response.data);
      } catch (error) {
        console.error(`Error fetching data for ${url}:`, error.message);
        return {
          url,
          LCP: 0,
          FID: 0,
          CLS: 0,
          TTFB: 0,
          error: error.response?.data?.error?.message || "API request failed",
        };
      }
    });

    const results = await Promise.all(requests);
    res.json(results);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
