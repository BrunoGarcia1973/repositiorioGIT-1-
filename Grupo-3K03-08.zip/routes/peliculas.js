const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/peliculas", async function (req, res, next) {
  let data = await db.pelicula.findAll({
    attributes: ["CodigoPel", "Nombre", "Fecha_lanzamiento"],
  });
  res.json(data);
});

module.exports = router;
