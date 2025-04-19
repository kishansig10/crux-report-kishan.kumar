import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TableSortLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ResultsTable = ({ data, onSort, sortConfig, summaryStats }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Function to render metrics summary cards
  const renderSummaryStats = () => {
    if (!summaryStats) return null;

    const metrics = Object.keys(summaryStats);

    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="summary-content"
          id="summary-header"
        >
          <Typography variant="h6">Summary Statistics</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {metrics.map((metric) => (
              <Grid item xs={12} sm={6} md={3} key={metric}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      {metric}
                    </Typography>
                    <Typography variant="body2">
                      Avg: {summaryStats[metric].average.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      Sum: {summaryStats[metric]?.sum}
                    </Typography>
                    <Typography variant="body2">
                      Min: {summaryStats[metric].min.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      Max: {summaryStats[metric].max.toFixed(2)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      {renderSummaryStats()}

      <Paper elevation={3} sx={{ mt: 3 }}>
        <TableContainer>
          <Table aria-label="CrUX data table">
            <TableHead>
              <TableRow>
                <TableCell>URL</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "LCP"}
                    direction={
                      sortConfig.key === "LCP" ? sortConfig.direction : "asc"
                    }
                    onClick={() => onSort("LCP")}
                  >
                    LCP (ms)
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "FID"}
                    direction={
                      sortConfig.key === "FID" ? sortConfig.direction : "asc"
                    }
                    onClick={() => onSort("FID")}
                  >
                    FID (ms)
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "CLS"}
                    direction={
                      sortConfig.key === "CLS" ? sortConfig.direction : "asc"
                    }
                    onClick={() => onSort("CLS")}
                  >
                    CLS
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortConfig.key === "TTFB"}
                    direction={
                      sortConfig.key === "TTFB" ? sortConfig.direction : "asc"
                    }
                    onClick={() => onSort("TTFB")}
                  >
                    TTFB (ms)
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row.url}
                  </TableCell>
                  <TableCell>{row.LCP}</TableCell>
                  <TableCell>{row.FID}</TableCell>
                  <TableCell>{row.CLS}</TableCell>
                  <TableCell>{row.TTFB}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ResultsTable;
