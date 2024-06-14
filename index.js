const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

const unsplashClientId = "j6Ypb6iH57j5I9QXL-dVR_gEcobyh0Mmdym-bOZn9Oo"; // Replace with your Unsplash API client ID

app.get('/randomphoto', async (req, res) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/photos/random`, {
      params: { query: 'girl', client_id: unsplashClientId }
    });

    if (response.status !== 200) {
      return res.status(response.status).json({ error: response.statusText });
    }

    return res.json(response.data);
  } catch (err) {
    const errorMessage = err.response?.data?.errors?.[0] || err.message || 'Unknown error';
    return res.status(500).json({
      error: 'An error occurred: ' + errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
