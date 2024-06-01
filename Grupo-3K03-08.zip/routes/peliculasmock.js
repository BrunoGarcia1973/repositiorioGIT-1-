const express = require('express');
const router = express.Router();

let arr_PeliculasMock = [
  {
    CodigoPel: 98769,
    Nombre: 'Titanic',
    Fecha_lanzamiento: '1997-12-19',
  },
  {
    CodigoPel: 98768,
    Nombre: 'Star Wars: Episodio IV - Una nueva esperanza',
    Fecha_lanzamiento: '1977-05-25',
  },
  {
    CodigoPel: 98767,
    Nombre: 'El Señor de los Anillos: La Comunidad del Anillo',
    Fecha_lanzamiento: '2001-12-19',
  },
  {
    CodigoPel: 98766,
    Nombre: 'Avatar',
    Fecha_lanzamiento: '2009-12-28',
  },
  {
    CodigoPel: 98765,
    Nombre: 'Parque Jurásico',
    Fecha_lanzamiento: '1993-06-11',
  },
  {
    CodigoPel: 98764,
    Nombre: 'Harry Potter y la piedra filosofal',
    Fecha_lanzamiento: '2001-11-16',
  },
  {
    CodigoPel: 98763,
    Nombre: 'El Rey León',
    Fecha_lanzamiento: '1994-06-15',
  },
  {
    CodigoPel: 98762,
    Nombre: 'Regreso al futuro',
    Fecha_lanzamiento: '1985-07-03',
  },
  {
    CodigoPel: 98761,
    Nombre: 'Los Vengadores',
    Fecha_lanzamiento: '2012-05-04',
  },
  {
    CodigoPel: 98760,
    Nombre: 'E.T., el extraterrestre',
    Fecha_lanzamiento: '1982-06-11',
  },
];

router.get('/api/peliculasmock', async function (req, res) {
  res.json(arr_PeliculasMock);
});

router.get('/api/peliculasmock/:codigoPel', async function (req, res) {
  let pel = arr_PeliculasMock.find((x) => x.CodigoPel == req.params.codigoPel);
  if (pel) res.json(pel);
  else res.status(404).json({ message: 'Pelicula no encontrada' });
});

router.post('/api/peliculasmock/', (req, res) => {
  const { Nombre, Fecha_lanzamiento } = req.body;
  let pel = {
    Nombre,
    Fecha_lanzamiento,
    CodigoPel: Math.floor(10000 + Math.random() * 90000),
  };

  // aqui agregar a la coleccion
  arr_PeliculasMock.push(pel);

  res.status(201).json(pel);
});

router.put('/api/peliculasmock/:codigoPel', (req, res) => {
  let pel = arr_PeliculasMock.find((x) => x.CodigoPel == req.params.codigoPel);

  if (pel) {
    const { Nombre } = req.body;
    pel.Nombre = Nombre;
    res.json({ message: 'Pelicula actualizada' });
  } else {
    res.status(404).json({ message: 'Pelicula no encontrada' });
  }
});

router.delete('/api/peliculasmock/:codigoPel', (req, res) => {
  let pel = arr_PeliculasMock.find((x) => x.CodigoPel == req.params.codigoPel);

  if (pel) {
    arr_PeliculasMock = arr_PeliculasMock.filter(
      (x) => x.CodigoPel != req.params.codigoPel
    );
    res.json({ message: 'Pelicula eliminada' });
  } else {
    res.status(404).json({ message: 'Pelicula no encontrada' });
  }
});

module.exports = router;
