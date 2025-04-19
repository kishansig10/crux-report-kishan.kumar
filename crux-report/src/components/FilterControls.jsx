import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  TextField,
  Grid,
} from "@mui/material";

const FilterControls = ({ onFilterChange }) => {
  const [metric, setMetric] = useState("");
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    if (metric) {
      onFilterChange({ metric, threshold });
    } else {
      onFilterChange({});
    }
  }, [metric, threshold, onFilterChange]);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Filter and Sort Controls
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="metric-select-label">Filter by Metric</InputLabel>
            <Select
              labelId="metric-select-label"
              id="metric-select"
              value={metric}
              label="Filter by Metric"
              onChange={(e) => setMetric(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="LCP">Largest Contentful Paint (LCP)</MenuItem>
              <MenuItem value="FID">First Input Delay (FID)</MenuItem>
              <MenuItem value="CLS">Cumulative Layout Shift (CLS)</MenuItem>
              <MenuItem value="TTFB">Time to First Byte (TTFB)</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          {metric && (
            <Box sx={{ width: "100%" }}>
              <Typography id="threshold-slider" gutterBottom>
                Threshold Value
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Slider
                  value={threshold}
                  onChange={(e, newValue) => setThreshold(newValue)}
                  aria-labelledby="threshold-slider"
                  min={0}
                  max={5000}
                  step={100}
                  sx={{ mr: 2, flexGrow: 1 }}
                />
                <TextField
                  value={threshold}
                  onChange={(e) => setThreshold(Number(e.target.value) || 0)}
                  inputProps={{
                    min: 0,
                    max: 5000,
                    type: "number",
                  }}
                  sx={{ width: "180px" }}
                />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterControls;
