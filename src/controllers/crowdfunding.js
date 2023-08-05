const pool = require("../connection");

const getProduct = async (req, res) => {
  const { nomeProduto } = req.body;

  try {
    const productResponse = await pool.query(
      "select * from produtos where nome = $1",
      [nomeProduto]
    );
    const statusProduct = await pool.query(
      "select * from produtos where data_limite < now()"
    );
    if (statusProduct.rowCount > 0) {
      await pool.query("update produtos set status = false where id = $1", [
        statusProduct.rows[0].id,
      ]);
    }
    if (productResponse.rowCount < 1) {
      return res.status(404).json({ error: "Recurso não encontrado na API." });
    }
    return res.json(productResponse.rows[0]);
  } catch (error) {
    res.status(500).json({ error: `${error?.message}` });
  }
};

const catchPlans = async (req, res) => {
  try {
    const { rows } = await pool.query("select * from planos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: `${error?.message}` });
  }
};

const fulfillPromise = async (req, res) => {
  const { idPlan, valor } = req.body;
  if (!idPlan || !valor) {
    return res.status(400).json({ error: "Parâmetros ausentes" });
  }
  if (String(valor)) {
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
  }
  return res
    .status(400)
    .json({ error: "Valor precisa ser passada como string" });
};

module.exports = {
  getProduct,
  catchPlans,
  fulfillPromise,
};
