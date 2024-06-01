const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init1");

router.get("/api/series", async function (req, res, next) {
  let data = await db.series.findAll({
    attributes: ["Codigo", "Nombre", "FechaEstreno"],
  });
  res.json(data);
});

module.exports = router;
