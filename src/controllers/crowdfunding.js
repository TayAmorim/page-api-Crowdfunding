const conexao = require("../connection");

const getProduct = async (req, res) => {
  const { idProduto } = req.params;

  try {
    const productResponse = await conexao("produtos")
      .where("id", idProduto)
      .first();
    const statusProduct = await conexao("produtos").where(
      "data_limite",
      "<",
      "now()"
    );

    if (statusProduct.length > 0) {
      await pool.query("update produtos set status = false where id = $1", [
        statusProduct.rows[0].id,
      ]);
    }
    if (productResponse.length < 0) {
      return res.status(404).json({ error: "Recurso não encontrado na API." });
    }
    return res.json(productResponse);
  } catch (error) {
    res.status(500).json({ error: `${error?.message}` });
  }
};

const catchPlans = async (req, res) => {
  try {
    const getPlans = await conexao("planos");
    res.json(getPlans);
  } catch (error) {
    res.status(500).json({ error: `${error?.message}` });
  }
};

const fulfillPromise = async (req, res) => {
  const { idPlan, valor } = req.body;
  if (!idPlan || !valor) {
    return res.status(400).json({ error: "Parâmetros ausentes" });
  }
  if (typeof valor === "string") {
    const clearValue = valor.replace(",", "").replace(".", "");
    const newValue = Number(clearValue);
    try {
      await pool.query("insert into apoios (valor, id_plano) values ($1, $2)", [
        newValue,
        idPlan,
      ]);
      await pool.query(
        "update planos set quantidade = quantidade - 1 where id = $1",
        [idPlan]
      );
      const { rows } = await pool.query(
        "select id_produto from planos where id = $1",
        [idPlan]
      );
      await pool.query(
        "update produtos set valor_arrecadado =  + $1, total_apoios = total_apoios + 1 where id = $2",
        [newValue, rows[0].id_produto]
      );
      res.status(201).json("Apoio realizado com sucesso");
    } catch (error) {
      res.status(500).json({ error: `${error?.message}` });
    }
  } else {
    return res
      .status(400)
      .json({ error: "Valor precisa ser passada como string em centavos" });
  }
};

module.exports = {
  getProduct,
  catchPlans,
  fulfillPromise,
};
