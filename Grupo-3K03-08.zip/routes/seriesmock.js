const express = require('express');
const router = express.Router();

let arr_SeriesMock = [
  {
    Codigo: 11111,
    CodigoSerie: 2354,
    Nombre: 'One Tree Hill',
    FechaEstreno: '2003-09-23',
  },
  {
    Codigo: 22222,
    CodigoSerie: 9188,
    Nombre: 'Gilmore Girls',
    FechaEstreno: '2000-10-05',
  },
  {
    Codigo: 33333,
    CodigoSerie: 0323,
    Nombre: 'Gossip Girl',
    FechaEstreno: '2007-09-19',
  },
  {
    Codigo: 4444,
    CodigoSerie: 0423,
    Nombre: 'Friends',
    FechaEstreno: '1994-09-22',
  },
  {
    Codigo: 55555,
    CodigoSerie: 0523,
    Nombre: 'Modern Family',
    FechaEstreno: '2009-09-23',
  },
  {
    Codigo: 66666,
    CodigoSerie: 0623,
    Nombre: 'Game Of Thrones',
    FechaEstreno: '2011-04-17',
  },
  {
    Codigo: 77777,
    CodigoSerie: 0723,
    Nombre: 'The Summer I Turned Pretty',
    FechaEstreno: '2022-06-17',
  },
  {
    Codigo: 88888,
    CodigoSerie: 0823,
    Nombre: 'My Life With The Walter Boys',
    FechaEstreno: '2023-12-07',
  },
  {
    Codigo: 99999,
    CodigoSerie: 0923,
    Nombre: 'Succession',
    FechaEstreno: '2018-06-03',
  },
  {
    Codigo: 11112,
    CodigoSerie: 0233,
    Nombre: 'How I Met Your Mother',
    FechaEstreno: '2005-09-19',
  },
];

router.get('/api/seriesmock', async function (req, res) {
  res.json(arr_SeriesMock);
});

router.get('/api/seriesmock/:codigo/:codigoSerie', async function (req, res) {
  let ser = arr_SeriesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoSerie === req.params.codigoSerie
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

router.put('/api/seriesmock/:codigo/:codigoSerie', (req, res) => {
  let ser = arr_SeriesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoSerie === req.params.codigoSerie
  );

  if (ser) {
    const { Nombre } = req.body;
    ser.Nombre = Nombre;
    res.json({ message: 'Serie actualizada' });
  } else {
    res.status(404).json({ message: 'Serie no encontrada' });
  }
});

router.delete('/api/seriesmock/:codigo/:codigoSerie', (req, res) => {
  let ser = arr_SeriesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoSerie === req.params.codigoSerie
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
