import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

function UrlForm() {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);
  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };
  const handleAddRow = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
    }
  };
  const validateURL = (str) => {
    const pattern = new RegExp("^(https?:\\/\\/)?(www\\.)?[\\w\\-]+\\.[\\w]{2,}(\\/\\S*)?$", "i");
    return pattern.test(str);
  };
  const handleSubmit = async () => {
    const validInputs = urls.filter(u => validateURL(u.url));
    const response = await fetch("https://your-backend/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validInputs),
    });
    const data = await response.json();
    setResults(data);
  };
  return (
    <Grid container spacing={2}>
      {urls.map((item, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Long URL"
              value={item.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Validity (mins)"
              value={item.validity}
              onChange={(e) => handleChange(index, "validity", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Shortcode"
              value={item.shortcode}
              onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              fullWidth
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid item xs={12}>
    <Button onClick={handleAddRow}>Add another</Button>
        <Button variant="contained" onClick={handleSubmit}>Shorten URLs</Button>
      </Grid>
    </Grid>
  );
}
export default UrlForm;
