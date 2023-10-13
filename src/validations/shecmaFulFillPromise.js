const yup = require("./settings");

const schemaFulFillPromise = yup.object().shape({
  id_plano: yup.number().required("O campo Id do plano é necessário"),
  valor: yup.number().strict().required("O valor é um campo obrigatório"),
});

module.exports = schemaFulFillPromise;
