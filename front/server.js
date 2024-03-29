const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/front/browser/"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/front/browser/" })
);

app.listen(process.env.PORT || 8080);
