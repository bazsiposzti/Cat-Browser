require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");


const app = express();
const PORT = 3000;

app.use(cors()); // lehetővé teszi a frontend hozzáférést
app.use(express.static(path.join(__dirname, "public")));


const breedUrl = "https://api.thecatapi.com/v1/breeds";

// Cat breed list
app.get("/api/breeds", async (req, res) => {
  try {
    const result = await fetch(breedUrl, {
      headers: { "x-api-key": process.env.API_KEY }
    });
    console.log("Status code:", result.status); 
    const data = await result.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching breeds" });
  }
});

// Cat image by breed
app.get("/api/cat/:breedId", async (req, res) => {
  try {
    const breedId = req.params.breedId;
    const result = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
      headers: { "x-api-key": process.env.API_KEY }
    });
    const data = await result.json();
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cat image" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
