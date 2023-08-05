const pool = require("../connection");

const getProduct = async (req, res) => {
  const { nomeProduto } = req.params;

  try {
    const productResponse = await pool.query(
      "select * from produtos where nome = $1",
      [nomeProduto]
    );
    if (productResponse.rowCount < 1) {
      return res.status(404).json({ error: "Recurso não encontrado na API." });
    }
  } catch (error) {
    res.status(500).json({ error: `${error?.message}` });
  }
};

module.exports = {
  getProduct,
};
