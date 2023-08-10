require("dotenv").config();

const keyBd = process.env.KEY_BD;

const conexao = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: keyBd,
    database: "pagina_crowdfunding",
  },
});

module.exports = conexao;
