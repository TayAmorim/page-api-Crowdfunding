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

const fulfillPromise = async (req, res) => {};

module.exports = {
  getProduct,
  catchPlans,
  fulfillPromise,
};
