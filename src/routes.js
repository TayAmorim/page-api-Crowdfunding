const express = require("express");
const {
  getProduct,
  catchPlans,
  fulfillPromise,
} = require("./controllers/crowdfunding");

const routes = express();

routes.get("/produto/:idProduto", getProduct);
routes.get("/planos", catchPlans);
routes.post("/apoio", fulfillPromise);

module.exports = routes;
