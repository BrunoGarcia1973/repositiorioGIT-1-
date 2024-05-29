const express = require('express');
const router = express.Router();

let arr_SeriesMock = [
  {
    Codigo: 11111,
    CodigoProd: 2354,
    Nombre: 'One Tree Hill',
    Fecha_estreno: '2003-09-23',
  },
  {
    Codigo: 22222,
    CodigoProd: 9188,
    Nombre: 'Gilmore Girls',
    Fecha_lanzamiento: '2000-10-05',
  },
  {
    Codigo: 33333,
    CodigoProd: 0323,
    Nombre: 'Gossip Girl',
    Fecha_lanzamiento: '2007-09-19',
  },
  {
    Codigo: 4444,
    CodigoProd: 0423,
    Nombre: 'Friends',
    Fecha_ingreso: '1994-09-22',
  },
  {
    Codigo: 55555,
    CodigoProd: 0523,
    Nombre: 'Modern Family',
    Fecha_lanzamiento: '2009-09-23',
  },
  {
    Codigo: 66666,
    CodigoProd: 0623,
    Nombre: 'Game Of Thrones',
    Fecha_lanzamiento: '2011-04-17',
  },
  {
    Codigo: 77777,
    CodigoProd: 0723,
    Nombre: 'The Summer I Turned Pretty',
    Fecha_lanzamiento: '2022-06-17',
  },
  {
    Codigo: 88888,
    CodigoProd: 0823,
    Nombre: 'My Life With The Walter Boys',
    Fecha_lanzamiento: '2023-12-07',
  },
  {
    Codigo: 99999,
    CodigoProd: 0923,
    Nombre: 'Succession',
    Fecha_lanzamiento: '2018-06-03',
  },
  {
    Codigo: 11112,
    CodigoProd: 0233,
    Nombre: 'How I Met Your Mother',
    Fecha_lanzamiento: '2005-09-19',
  },
];

router.get('/api/seriesmock', async function (req, res) {
  res.json(arr_SeriesMock);
});

router.get('/api/seriesmock/:codigo/:codProd', async function (req, res) {
  let ser = arr_SeriesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );
  if (ser) res.json(ser);
  else res.status(404).json({ message: 'Serie no encontrada' });
});

router.post('/api/seriesmock/', (req, res) => {
  const { Nombre, FechaEstreno } = req.body;
  let ser = {
    Nombre,
    FechaEstreno,
    Codigo: Math.floor(10000 + Math.random() * 90000),
  };

  // aqui agregar a la coleccion
  arr_SeriesMock.push(ser);

  res.status(201).json(ser);
});

router.put('/api/seriesmock/:codigo/:codProd', (req, res) => {
  let ser = arr_SeriesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );

  if (ser) {
    const { Nombre } = req.body;
    ser.Nombre = Nombre;
    res.json({ message: 'Serie actualizada' });
  } else {
    res.status(404).json({ message: 'Serie no encontrada' });
  }
});

router.delete('/api/seriesmock/:codigo/:codProd', (req, res) => {
  let ser = arr_SeriesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );

  if (ser) {
    arr_SeriesMock = arr_SeriesMock.filter(
      (x) => x.Codigo != req.params.codigo
    );
    res.json({ message: 'Serie eliminada' });
  } else {
    res.status(404).json({ message: 'Serie no encontrada' });
  }
});

module.exports = router;
