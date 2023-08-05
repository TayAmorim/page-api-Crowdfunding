require("dotenv").config();
const { Pool } = require("pg");
const keyBd = process.env.KEY_BD;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: keyBd,
  database: "pagina_crowdfunding",
});

module.exports = pool;
