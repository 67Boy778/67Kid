const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running.");
});

app.get("/check", (req, res) => {
  const filePath = path.join(__dirname, "file.hta");

  console.log("Looking for:", filePath);

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return res.status(404).send("file.hta was not found on the server.");
  }

  res.download(filePath, "file.hta", (err) => {
    if (err && !res.headersSent) {
      console.error("Download error:", err);
      res.status(500).send("Download failed.");
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
