const express = require('express');
const router = express.Router();

let arr_ProductoraMock = [
  {
    CodigoProd: 1123,
    Nombre: 'Rodrigo',
    Fecha_nacimiento: '1973-05-24',
  },
  {
    CodigoProd: 1223,
    Nombre: 'Ulises',
    Fecha_nacimiento: '1986-05-22',
  },
  {
    CodigoProd: 1323,
    Nombre: 'Cristian',
    Fecha_nacimiento: '1970-05-24',
  },
  {
    CodigoProd: 1423,
    Nombre: 'Damian',
    Fecha_nacimiento: '1990-04-17',
  },
  {
    CodigoProd: 1523,
    Nombre: 'Euguenia',
    Fecha_nacimiento: '1950-12-24',
  },
  {
    CodigoProd: 1623,
    Nombre: 'Magali',
    Fecha_nacimiento: '1973-05-24',
  },
  {
    CodigoProd: 1723,
    Nombre: 'Cristina',
    Fecha_nacimiento: '2000-05-30',
  },
  {
    CodigoProd: 1823,
    Nombre: 'Rufino',
    Fecha_nacimiento: '1952-02-01',
  },
  {
    CodigoProd: 1923,
    Nombre: 'Anabela',
    Fecha_nacimiento: '1973-05-22',
  },
  {
    CodigoProd: 1233,
    Nombre: 'Vanesa',
    Fecha_nacimiento: '1993-11-19',
  },
];

router.get('/api/productoramock', async function (req, res) {
  res.json(arr_ProductoraMock);
});

router.get('/api/productoramock/:codigoProd', async function (req, res) {
  let prod = arr_ProductoraMock.find(
    (x) => x.CodigoProd == req.params.codigoProd
  );
  if (prod) res.json(prod);
  else res.status(404).json({ message: 'productora no encontrado' });
});

router.post('/api/productoramock/', (req, res) => {
  const { Nombre, Fecha_nacimiento } = req.body;
  let parcial = {
    Nombre,
    Fecha_nacimiento,
    CodigoProd: Math.floor(1000 + Math.random() * 9000),
  };

  // aqui agregar a la coleccion
  arr_ProductoraMock.push(parcial);

  res.status(201).json(parcial);
});

router.put('/api/productoramock/:codigoProd', (req, res) => {
  let prod = arr_ProductoraMock.find(
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

router.delete('/api/productoramock/:codigoProd', (req, res) => {
  let prod = arr_ProductoraMock.find(
    (x) => x.CodigoProd == req.params.codigoProd
  );

  if (prod) {
    arr_ProductoraMock = arr_ProductoraMock.filter(
      (x) => x.CodigoProd == req.params.codigoProd
    );
    res.json({ message: 'productora eliminado' });
  } else {
    res.status(404).json({ message: 'productora no encontrado' });
  }
});

module.exports = router;
