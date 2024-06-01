const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/productora", async function (req, res, next) {
  let data = await db.productora.findAll({
    attributes: ["CodigoPrd", "Nombre", "Fecha_nacimiento"],
  });
  res.json(data);
});

module.exports = router;
