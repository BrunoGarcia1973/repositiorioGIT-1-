const express = require('express');
const router = express.Router();

let arr_SeriesMock = [
  {
    CodigoProd: 0123,
    Nombre: 'Rodrigo',
    Fecha_nacimiento: '1973-05-24',
  },
  {
    CodigoProd: 0223,
    Nombre: 'Ulises',
    Fecha_nacimiento: '1986-05-22',
  },
  {
    CodigoProd: 0323,
    Nombre: 'Cristian',
    Fecha_nacimiento: '1970-05-24',
  },
  {
    CodigoProd: 0423,
    Nombre: 'Damian',
    Fecha_nacimiento: '1990-04-17',
  },
  {
    CodigoProd: 0523,
    Nombre: 'Euguenia',
    Fecha_nacimiento: '1950-12-24',
  },
  {
    CodigoProd: 0623,
    Nombre: 'Magali',
    Fecha_nacimiento: '1973-05-24',
  },
  {
    CodigoProd: 0723,
    Nombre: 'Cristina',
    Fecha_nacimiento: '2000-05-30',
  },
  {
    CodigoProd: 0823,
    Nombre: 'Rufino',
    Fecha_nacimiento: '1952-02-01',
  },
  {
    CodigoProd: 0923,
    Nombre: 'Anabela',
    Fecha_nacimiento: '1973-05-22',
  },
  {
    CodigoProd: 0233,
    Nombre: 'Vanesa',
    Fecha_nacimiento: '1993-11-19',
  },
];

router.get('/api/seriesmock', async function (req, res) {
  res.json(arr_SeriesMock);
});

router.get('/api/seriesmock/:codigoProd', async function (req, res) {
  let prod = arr_SeriesMock.find(
    (x) => x.CodigoProd == req.params.codigoProd
  );
  if (prod) res.json(prod);
  else res.status(404).json({ message: 'productora no encontrado' });
});

router.post('/api/seriesmock/', (req, res) => {
  const { Nombre, Fecha_nacimiento } = req.body;
  let parcial = {
    Nombre,
    Fecha_nacimiento,
    CodigoProd: Math.floor(10000 + Math.random() * 90000),
  };

  // aqui agregar a la coleccion
  arr_SeriesMock.push(parcial);

  res.status(201).json(parcial);
});

router.put('/api/seriesmock/:codigoProd', (req, res) => {
  let prod = arr_SeriesMock.find(
    (x) => x.CodigoProd == req.params.codigoProd
  );

  if (prod) {
    const { Nombre } = req.body;
    prod.Nombre = Nombre;
    res.json({ message: 'productora actualizado' });
  } else {
    res.status(404).json({ message: 'productora no encontrado' });
  }
});

router.delete('/api/seriesmock/:codigoProd', (req, res) => {
  let prod = arr_SeriesMock.find(
    (x) => x.CodigoProd == req.params.codigoProd
  );

  if (prod) {
    arr_SeriesMock = arr_SeriesMock.filter(
      (x) => x.CodigoProd == req.params.codigoProd
    );
    res.json({ message: 'productora eliminado' });
  } else {
    res.status(404).json({ message: 'productora no encontrado' });
  }
});

module.exports = router;
