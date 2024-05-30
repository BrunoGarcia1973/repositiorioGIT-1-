const express = require('express');
const router = express.Router();

let arr_SeriesMock = [
  {
    CodigoSerie: 2354,
    Nombre: 'De Repente echo de Menos a Todos',
    Duracion: '42:00',
  },
  {
    CodigoSerie: 9188,
    Nombre: 'Written In The Stars',
    Duracion: '43:00',
  },
  {
    CodigoSerie: 0323,
    Nombre: 'The Lost Boy',
    Duracion: '42:00',
  },
  {
    CodigoSerie: 0423,
    Nombre: 'El Asistente de Rachel',
    Duracion: '22:00',
  },
  {
    CodigoSerie: 0523,
    Nombre: 'Terremoto',
    Duracion: '22:00',
  },
  {
    CodigoSerie: 0623,
    Nombre: 'The Gift',
    Duracion: '53:00',
  },
  {
    CodigoSerie: 0723,
    Nombre: 'Amor perdido',
    Duracion: '57:00',
  },
  {
    CodigoSerie: 0823,
    Nombre: 'Revolutions',
    Duracion: '43:00',
  },
  {
    CodigoSerie: 0923,
    Nombre: 'Lion in the Meadow',
    Duracion: '59:00',
  },
  {
    CodigoSerie: 0233,
    Nombre: 'El Padrino',
    Duracion: '23:00',
  },
];

router.get('/api/seriesmock', async function (req, res) {
  res.json(arr_SeriesMock);
});

router.get('/api/seriesmock/:codigoSerie', async function (req, res) {
  let prod = arr_SeriesMock.find(
    (x) => x.CodigoSerie == req.params.codigoSerie
  );
  if (prod) res.json(prod);
  else res.status(404).json({ message: 'Capitulo no encontrado' });
});

router.post('/api/seriesmock/', (req, res) => {
  const { Nombre, Duracion } = req.body;
  let series = {
    Nombre,
    Duracion,
    CodigoSerie: Math.floor(10000 + Math.random() * 90000),
  };

  // aqui agregar a la coleccion
  arr_SeriesMock.push(series);

  res.status(201).json(series);
});

router.put('/api/seriesmock/:codigoSerie', (req, res) => {
  let cap = arr_SeriesMock.find(
    (x) => x.CodigoSerie== req.params.codigoSerie
  );

  if (cap) {
    const { Nombre } = req.body;
    cap.Nombre = Nombre;
    res.json({ message: 'Capitulo actualizado' });
  } else {
    res.status(404).json({ message: 'Capitulo no encontrado' });
  }
});

router.delete('/api/seriesmock/:codigoSerie', (req, res) => {
  let cap = arr_SeriesMock.find(
    (x) => x.CodigoSerie == req.params.codigoSerie
  );

  if (cap) {
    arr_SeriesMock = arr_SeriesMock.filter(
      (x) => x.CodigoSerie == req.params.codigoSerie
    );
    res.json({ message: 'Capitulo eliminado' });
  } else {
    res.status(404).json({ message: 'Capitulo no encontrado' });
  }
});

module.exports = router;
