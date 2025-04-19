import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const UrlInput = ({ onSearch, loading }) => {
  const [urls, setUrls] = useState([""]);

  const handleChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index) => {
    if (urls.length === 1) return;
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty URLs
    const validUrls = urls.filter((url) => url.trim() !== "");
    if (validUrls.length > 0) {
      onSearch(validUrls);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Enter URL(s) to analyze
      </Typography>

      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <Box
            key={index}
            sx={{ display: "flex", mb: 2, alignItems: "center" }}
          >
            <TextField
              fullWidth
              label={`URL ${index + 1}`}
              value={url}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="https://www.example.com"
              variant="outlined"
              required={index === 0}
              disabled={loading}
            />
            {index > 0 && (
              <IconButton
                onClick={() => removeUrlField(index)}
                disabled={loading}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            )}
            {index === urls.length - 1 && (
              <IconButton
                onClick={addUrlField}
                disabled={loading}
                sx={{ ml: 1 }}
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
        ))}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={24} color="inherit" /> : null
          }
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>
    </Paper>
  );
};

export default UrlInput;
