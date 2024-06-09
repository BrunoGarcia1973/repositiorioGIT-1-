const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require('sequelize');
const auth = require('../seguridad/auth');

router.get("/api/capitulos", async function (req, res, next) {
  // #swagger.tags = ['Capitulos']
  // #swagger.summary = 'obtiene todos los Capitulos'
  // consulta de capitulos con filtros y paginacion

  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== '') {
    where.Nombre = {
      [Op.like]: '%' + req.query.Nombre + '%',
    };
  }
  if (req.query.Activo != undefined && req.query.Activo !== '') {
    // true o false en el modelo, en base de datos es 1 o 0
    // convertir el string a booleano
    where.Activo = req.query.Activo === 'true';
  }

  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;
  const { count, rows } = await db.capitulos.findAndCountAll({
    attributes: [
      'Codigo',
      'CodigoCapitulo',
      'Nombre',
      'Duracion',
      'Activo',
    ],
    order: [['CodigoCapitulo', 'ASC']],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

router.get('/api/capitulos/:codigoCapitulo', async function (req, res, next) {
  // #swagger.tags = ['Capitulos']
  // #swagger.summary = 'obtiene un Capitulo'
  // #swagger.parameters['codigoCapitulo'] = { description: 'identificador del Capitulo...' }

  let items = await db.capitulos.findOne({
    attributes: [
      'Codigo',
      'CodigoCapitulo',
      'Nombre',
      'Duracion',
      'Activo',
    ],
    where: { CodigoCapitulo: req.params.codigoCapitulo },
  });
  res.json(items);
});

router.post('/api/capitulos/', async (req, res) => {
  // #swagger.tags = ['Capitulos']
  // #swagger.summary = 'agrega un Capitulo'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Capitulo',
                schema: { $ref: '#/definitions/Capitulos' }
    } */

  try {
    let data = await db.capitulos.create({
      Nombre: req.body.Nombre,
      Codigo: req.body.Codigo,
      CodigoCapitulo: req.body.CodigoCapitulo,
      Duracion: req.body.Duracion,
      Activo: req.body.Activo
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach(
        (x) => (messages += (x.path ?? 'campo') + ': ' + x.message + '\n')
      );
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put('/api/capitulos/:codigoCapitulo', async (req, res) => {
  // #swagger.tags = ['Capitulos']
  // #swagger.summary = 'actualiza un Capitulo'
  // #swagger.parameters['codigoCapitulo'] = { description: 'identificador del Capitulo...' }
  /*    #swagger.parameters['Capitulo'] = {
                in: 'body',
                description: 'Capitulo a actualizar',
                schema: { $ref: '#/definitions/Capitulos' }
    } */

  try {
    let item = await db.capitulos.findOne({
      attributes: [
      'Codigo',
      'CodigoCapitulo',
      'Nombre',
      'Duracion',
      'Activo',
      ],
      where: { CodigoCapitulo: req.params.codigoCapitulo },
    });
    if (!item) {
      res.status(404).json({ message: 'Capítulo no encontrado' });
      return;
    }
    item.Nombre = req.body.Nombre;
    item.Codigo = req.body.Codigo;
    item.CodigoCapitulo = req.body.CodigoCapitulo;
    item.Duracion = req.body.Duracion;
    item.Activo = req.body.Activo;
    await item.save();


    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validación, los devolvemos
      let messages = '';
      err.errors.forEach((x) => (messages += x.path + ': ' + x.message + '\n'));
      res.status(400).json({ message: messages });
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete('/api/capitulos/:codigoCapitulo', async (req, res) => {
  // #swagger.tags = ['Capitulos']
  // #swagger.summary = 'elimina un Capitulo'
  // #swagger.parameters['codigoCapitulo'] = { description: 'identificador del Capitulo..' }


  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.capitulos.destroy({
      where: { CodigoCapitulo: req.params.codigoCapitulo },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja lógica
    try {
      let data = await db.sequelize.query(
        'UPDATE capitulos SET Activo = case when Activo = 1 then 0 else 1 end WHERE CodigoCapitulo = :CodigoCapitulo',
        {
          replacements: { CodigoCapitulo: +req.params.codigoCapitulo },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  '/api/capitulosJWT',
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
                 "bearerAuth1": []
          }] */

    // #swagger.tags = ['Capitulos']
    // #swagger.summary = 'obtiene todos los Capitulos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== 'admin') {
      return res.status(403).json({ message: 'usuario no autorizado!' });
    }

    let items = await db.capitulos.findAll({
      attributes: [
      'Codigo',
      'CodigoCapitulo',
      'Nombre',
      'Duracion',
      'Activo',
      ],
      order: [['CodigoCapitulo', 'ASC']],
    });
    res.json(items);
  }
);

module.exports = router;
