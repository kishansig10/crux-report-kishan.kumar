import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import UrlInput from "./components/UrlInput";
import ResultsTable from "./components/ResultsTable";
import FilterControls from "./components/FilterControls";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSearch = async (urls) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5001/api/crux", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ urls }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = React.useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSort = React.useCallback(
    (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  // Apply filters and sorting
  const filteredAndSortedResults = React.useMemo(() => {
    let processed = [...results];

    // Apply filters
    if (filters.metric && filters.threshold) {
      processed = processed.filter((item) => {
        return item[filters.metric] >= filters.threshold;
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      processed.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return processed;
  }, [results, filters, sortConfig]);

  // Calculate summary statistics
  const summaryStats = React.useMemo(() => {
    if (results.length === 0) return null;

    const metrics = ["LCP", "FID", "CLS", "TTFB"];
    const stats = {};

    metrics.forEach((metric) => {
      const values = results.map((item) => item[metric] || 0);
      stats[metric] = {
        average: values.reduce((a, b) => a + b, 0) / values.length,
        sum: values.reduce((a, b) => a + b, 0),
        min: Math.min(...values),
        max: Math.max(...values),
      };
    });

    return stats;
  }, [results]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Chrome UX Report Analyzer
          </Typography>

          <UrlInput onSearch={handleSearch} loading={loading} />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error: {error}
            </Typography>
          )}

          {results.length > 0 && (
            <>
              <FilterControls onFilterChange={handleFilterChange} />
              <ResultsTable
                data={filteredAndSortedResults}
                onSort={handleSort}
                sortConfig={sortConfig}
                summaryStats={summaryStats}
              />
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
