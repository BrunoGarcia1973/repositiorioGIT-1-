const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/capitulos", async function (req, res, next) {
  let data = await db.capitulos.findAll({
    attributes: ["Codigo", "CodigoCapitulo", "Nombre", "Duracion"],
  });
  res.json(data);
});

module.exports = router;
