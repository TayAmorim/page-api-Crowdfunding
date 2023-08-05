const express = require("express");
const { getProduct } = require("./controllers/crowdfunding");

const routes = express();

routes.get("/produto/:nomeProduto", getProduct);

module.exports = routes;
