const express = require('express');
const router = express.Router();

let arr_CapitulosMock = [
  {
    Codigo: 10000,
    CodigoCapitulo: 1000,
    Nombre: 'De Repente echo de Menos a Todos',
    Duracion: '42:00',
  },
  {
    Codigo: 20000,
    CodigoCapitulo: 2000,
    Nombre: 'Written In The Stars',
    Duracion: '43:00',
  },
  {
    Codigo: 30000,
    CodigoCapitulo: 3000,
    Nombre: 'The Lost Boy',
    Duracion: '42:00',
  },
  {
    Codigo: 40000,
    CodigoCapitulo: 4000,
    Nombre: 'El Asistente de Rachel',
    Duracion: '22:00',
  },
  {
    Codigo: 50000,
    CodigoCapitulo: 5000,
    Nombre: 'Terremoto',
    Duracion: '22:00',
  },
  {
    Codigo: 60000,
    CodigoCapitulo: 6000,
    Nombre: 'The Gift',
    Duracion: '53:00',
  },
  {
    Codigo: 70000,
    CodigoCapitulo: 7000,
    Nombre: 'Amor perdido',
    Duracion: '57:00',
  },
  {
    Codigo: 80000,
    CodigoCapitulo: 8000,
    Nombre: 'Revolutions',
    Duracion: '43:00',
  },
  {
    Codigo: 90000,
    CodigoCapitulo: 9000,
    Nombre: 'Lion in the Meadow',
    Duracion: '59:00',
  },
  {
    Codigo: 10001,
    CodigoCapitulo: 1111,
    Nombre: 'El Padrino',
    Duracion: '23:00',
  },
];

router.get('/api/capitulosmock', async function (req, res) {
  res.json(arr_CapitulosMock);
});

router.get('/api/capitulosmock/:codigoCapitulo', async function (req, res) {
  let cap = arr_CapitulosMock.find(
    (x) => x.CodigoCapitulo == req.params.codigoCapitulo
  );
  if (cap) res.json(cap);
  else res.status(404).json({ message: 'Capitulo no encontrado' });
});

router.post('/api/capitulosmock/', (req, res) => {
  const { Nombre, Duracion } = req.body;
  let cap = {
    Codigo: Math.floor(10000 + Math.random() * 90000),
    CodigoCapitulo: Math.floor(1000 + Math.random() * 9000),
    Nombre,
    Duracion,
  };

  // aqui agregar a la coleccion
  arr_SeriesMock.push(cap);

  res.status(201).json(cap);
});

router.put('/api/capitulosmock/:codigoCapitulo', (req, res) => {
  let cap = arr_CapitulosMock.find(
    (x) => x.CodigoCapitulo== req.params.codigoCapitulo
  );

  if (cap) {
    const { Nombre } = req.body;
    cap.Nombre = Nombre;
    res.json({ message: 'Capitulo actualizado' });
  } else {
    res.status(404).json({ message: 'Capitulo no encontrado' });
  }
});

router.delete('/api/capitulosmock/:codigoCapitulo', (req, res) => {
  let cap = arr_CapitulosMock.find(
    (x) => x.CodigoCapitulo == req.params.codigoCapitulo
  );

  if (cap) {
    arr_CapitulosMock = arr_CapitulosMock.filter(
      (x) => x.CodigoCapitulo == req.params.codigoCapitulo
    );
    res.json({ message: 'Capitulo eliminado' });
  } else {
    res.status(404).json({ message: 'Capitulo no encontrado' });
  }
});

module.exports = router;
