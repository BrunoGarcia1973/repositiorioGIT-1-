const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/actores", async function (req, res, next) {
  let data = await db.actores.findAll({
    attributes: ["CodigoAct", "CodigoPel", "Nombre", "Fecha_nacimiento"],
  });
  res.json(data);
});

module.exports = router;
