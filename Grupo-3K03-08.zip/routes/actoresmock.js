const express = require('express');
const router = express.Router();

let arr_ActoresMock = [
  {
    CodigoAct: 54329,
    CodigoPel: 98769,
    Nombre: 'John',
    Fecha_nacimiento: '1987-04-05',
  },
  {
    CodigoAct: 54328,
    CodigoPel: 98768,
    Nombre: 'Michael',
    Fecha_nacimiento: '1970-08-30',
  },
  {
    CodigoAct: 54327,
    CodigoPel: 98767,
    Nombre: 'Sarah',
    Fecha_nacimiento: '1989-02-06',
  },
  {
    CodigoAct: 54326,
    CodigoPel: 98766,
    Nombre: 'David',
    Fecha_nacimiento: '1988-06-21',
  },
  {
    CodigoAct: 54325,
    CodigoPel: 98765,
    Nombre: 'Laura',
    Fecha_nacimiento: '1982-02-20',
  },
  {
    CodigoAct: 54324,
    CodigoPel: 98764,
    Nombre: 'Simon',
    Fecha_nacimiento: '1974-12-19',
  },
  {
    CodigoAct: 54323,
    CodigoPel: 98763,
    Nombre: 'Alvaro',
    Fecha_nacimiento: '2005-03-26',
  },
  {
    CodigoAct: 54322,
    CodigoPel: 98762,
    Nombre: 'Sofia',
    Fecha_nacimiento: '2004-07-02',
  },
  {
    CodigoAct: 54321,
    CodigoPel: 98761,
    Nombre: 'Maria',
    Fecha_nacimiento: '1999-08-21',
  },
  {
    CodigoAct: 54320,
    CodigoPel: 98760,
    Nombre: 'Tobias',
    Fecha_nacimiento: '2002-03-31',
  },
];

router.get('/api/actoresmock', async function (req, res) {
    res.json(arr_ActoresMock);
  });
  
  router.get('/api/actoresmock/:codigoAct/:codigoPel', async function (req, res) {
    let act = arr_ActoresMock.find(
      (x) => x.CodigoAct == req.params.codigoAct && x.CodigoPel === req.params.codigoPel
    );
    if (act) res.json(act);
    else res.status(404).json({ message: 'Actor no encontrado' });
  });
  
  router.post('/api/actoresmock/', (req, res) => {
    const { Nombre, Fecha_nacimiento, CodigoPel } = req.body;
    let act = {
      Nombre,
      Fecha_nacimiento,
      CodigoPel,
      CodigoAct: Math.floor(10000 + Math.random() * 90000),
    };
  
    // aqui agregar a la coleccion
    arr_ActoresMock.push(act);
  
    res.status(201).json(act);
  });
  
  router.put('/api/actoresmock/:codigoAct/:codigoPel', (req, res) => {
    let act = arr_ActoresMock.find(
      (x) => x.CodigoAct == req.params.codigoAct && x.CodigoPel === req.params.codigoPel
    );
  
    if (act) {
      const { Nombre } = req.body;
      act.Nombre = Nombre;
      res.json({ message: 'Actor actualizado' });
    } else {
      res.status(404).json({ message: 'Actor no encontrado' });
    }
  });
  
  router.delete('/api/actoresmock/:codigoAct/:codigoPel', (req, res) => {
    let act = arr_ActoresMock.find(
      (x) => x.CodigoAct == req.params.codigoAct && x.CodigoPel === req.params.codigoPel
    );
  
    if (act) {
      arr_ActoresMock = arr_ActoresMock.filter(
        (x) => x.CodigoAct != req.params.codigoAct
      );
      res.json({ message: 'Actor eliminado' });
    } else {
      res.status(404).json({ message: 'Actor no encontrado' });
    }
  });
  
  module.exports = router;
  