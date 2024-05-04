const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const { scrapeScript } = require("./script");
const { scrapeYoutube } = require("./youtube");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});
app.get("/script", (req, res) => {
  scrapeScript(res);
});
app.get("/youtube", (req, res) => {
  scrapeYoutube(res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
