const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("funcionando");
});

app.listen(3000);
