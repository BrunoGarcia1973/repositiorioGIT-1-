const express = require('express');
const router = express.Router();

let arr_PeliculasMock = [
  {
    Codigo: 11111,
    CodigoProd: 2354,
    Nombre: 'Titanic',
    Fecha_estreno: '1997-12-19',
  },
  {
    Codigo: 22222,
    CodigoProd: 9188,
    Nombre: 'Star Wars: Episodio IV - Una nueva esperanza',
    Fecha_lanzamiento: '1977-05-25',
  },
  {
    Codigo: 33333,
    CodigoProd: 0323,
    Nombre: 'El Señor de los Anillos: La Comunidad del Anillo',
    Fecha_lanzamiento: '2001-12-19',
  },
  {
    Codigo: 4444,
    CodigoProd: 0423,
    Nombre: 'Avatar',
    Fecha_ingreso: '2009-12-28',
  },
  {
    Codigo: 55555,
    CodigoProd: 0523,
    Nombre: 'Parque Jurásico',
    Fecha_lanzamiento: '1993-06-11',
  },
  {
    Codigo: 66666,
    CodigoProd: 0623,
    Nombre: 'Harry Potter y la piedra filosofal',
    Fecha_lanzamiento: '2001-11-16',
  },
  {
    Codigo: 77777,
    CodigoProd: 0723,
    Nombre: 'El Rey León',
    Fecha_lanzamiento: '1994-06-15',
  },
  {
    Codigo: 88888,
    CodigoProd: 0823,
    Nombre: 'Regreso al futuro',
    Fecha_lanzamiento: '1985-07-03',
  },
  {
    Codigo: 99999,
    CodigoProd: 0923,
    Nombre: 'Los Vengadores',
    Fecha_lanzamiento: '2012-05-04',
  },
  {
    Codigo: 11112,
    CodigoProd: 0233,
    Nombre: 'E.T., el extraterrestre',
    Fecha_lanzamiento: '1982-06-11',
  },
];

router.get('/api/peliculasmock', async function (req, res) {
  res.json(arr_PeliculasMock);
});

router.get('/api/peliculasmock/:codigo/:codProd', async function (req, res) {
  let ser = arr_PeliculasMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );
  if (ser) res.json(ser);
  else res.status(404).json({ message: 'Pelicula no encontrada' });
});

router.post('/api/peliculasmock/', (req, res) => {
  const { Nombre, FechaEstreno } = req.body;
  let pel = {
    Nombre,
    FechaEstreno,
    Codigo: Math.floor(10000 + Math.random() * 90000),
  };

  // aqui agregar a la coleccion
  arr_PeliculasMock.push(pel);

  res.status(201).json(pel);
});

router.put('/api/peliculasmock/:codigo/:codProd', (req, res) => {
  let pel = arr_PeliculasMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );

  if (pel) {
    const { Nombre } = req.body;
    pel.Nombre = Nombre;
    res.json({ message: 'Pelicula actualizada' });
  } else {
    res.status(404).json({ message: 'Pelicula no encontrada' });
  }
});

router.delete('/api/peliculasmock/:codigo/:codProd', (req, res) => {
  let pel = arr_PeliculasMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );

  if (pel) {
    arr_PeliculasMock = arr_PeliculasMock.filter(
      (x) => x.Codigo != req.params.codigo
    );
    res.json({ message: 'Pelicula eliminada' });
  } else {
    res.status(404).json({ message: 'Pelicula no encontrada' });
  }
});

module.exports = router;
