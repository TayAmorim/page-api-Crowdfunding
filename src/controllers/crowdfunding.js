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
      await conexao("produtos").update("status", false).where("id", idProduto);
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
  const { id_plano, valor } = req.body;
  if (!id_plano || !valor) {
    return res.status(400).json({ error: "Parâmetros ausentes" });
  }
  if (typeof valor === "string") {
    const clearValue = valor.replace(",", "").replace(".", "");
    const newValue = Number(clearValue);

    try {
      await conexao("apoios").insert({ valor: newValue, id_plano });
      const { quantidade } = await conexao("planos")
        .select("quantidade")
        .where("id", id_plano)
        .first();
      await conexao("planos")
        .update({ quantidade: quantidade - 1 })
        .where("id", id_plano);

      const { id_produto } = await conexao("planos")
        .select("id_produto")
        .where("id", id_plano)
        .first();

      const { valor_arrecadado, total_apoios } = await conexao("produtos")
        .select("valor_arrecadado", "total_apoios")
        .where("id", id_produto)
        .first();

      const produto = await conexao("produtos")
        .update({
          valor_arrecadado: valor_arrecadado + newValue,
          total_apoios: total_apoios + 1,
        })
        .where("id", id_produto);

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
