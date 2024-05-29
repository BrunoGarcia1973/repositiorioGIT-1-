onst express = require('express');
const router = express.Router();

let arr_SeriesMock = [
  {
    CodigoProd: 2354,
    Nombre: 'One Tree Hill',
    Fecha_estreno: '2003-09-23',
  },
  {
    CodigoProd: 9188,
    Nombre: 'Gilmore Girls',
    Fecha_lanzamiento: '2000-10-05',
  },
  {
    CodigoProd: 0323,
    Nombre: 'Gossip Girl',
    Fecha_lanzamiento: '2007-09-19',
  },
  {
    CodigoProd: 0423,
    Nombre: 'Friends',
    Fecha_ingreso: '1994-09-22',
  },
  {
    CodigoProd: 0523,
    Nombre: 'Modern Family',
    Fecha_lanzamiento: '2009-09-23',
  },
  {
    CodigoProd: 0623,
    Nombre: 'Game Of Thrones',
    Fecha_lanzamiento: '2011-04-17',
  },
  {
    CodigoProd: 0723,
    Nombre: 'The Summer I Turned Pretty',
    Fecha_lanzamiento: '2022-06-17',
  },
  {
    CodigoProd: 0823,
    Nombre: 'My Life With The Walter Boys',
    Fecha_lanzamiento: '2023-12-07',
  },
  {
    CodigoProd: 0923,
    Nombre: 'Succession',
    Fecha_lanzamiento: '2018-06-03',
  },
  {
    CodigoProd: 0233,
    Nombre: 'How I Met Your Mother',
    Fecha_lanzamiento: '2005-09-19',
  },
];

router.get('/api/seriesmock', async function (req, res) {
  res.json(arr_SeriesMock);
});

router.get('/api/seriesmock/:codigo/:codProd', async function (req, res) {
  let docu = arr_DocumentalesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );
  if (docu) res.json(docu);
  else res.status(404).json({ message: 'documental no encontrado' });
});

router.post('/api/documentalesmock/', (req, res) => {
  const { Nombre, FechaLanzamiento } = req.body;
  let docu = {
    Nombre,
    FechaLanzamiento,
    Codigoo: Math.floor(10000 + Math.random() * 90000),
  };

  // aqui agregar a la coleccion
  arr_DocumentalesMock.push(docu);

  res.status(201).json(docu);
});

router.put('/api/documentalesmock/:codigo/:codProd', (req, res) => {
  let docu = arr_DocumentalesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );

  if (docu) {
    const { Nombre } = req.body;
    docu.Nombre = Nombre;
    res.json({ message: 'documento actualizado' });
  } else {
    res.status(404).json({ message: 'documento no encontrado' });
  }
});

router.delete('/api/documentalesmock/:codigo/:codProd', (req, res) => {
  let docu = arr_DocumentalesMock.find(
    (x) => x.Codigo == req.params.codigo && x.CodigoProd === req.params.codProd
  );

  if (docu) {
    arr_DocumentalesMock = arr_DocumentalesMock.filter(
      (x) => x.Codigo != req.params.codigo
    );
    res.json({ message: 'documento eliminado' });
  } else {
    res.status(404).json({ message: 'documento no encontrado' });
  }
});

module.exports = router;
