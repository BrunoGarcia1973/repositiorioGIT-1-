const express = require('express');

// crear servidor
const app = express();

require("./base-orm/sqlite-init"); // crea la bases de datos sino existe

app.use(express.json());

// controlar ruta
app.get('/', (req, res) => {
  res.send('Backend inicial dds-backend!');
});

const documentalesMockRouter = require('./routes/documentalesmock');
app.use(documentalesMockRouter);

const documentalesRouter = require("./routes/documentales");
app.use(documentalesRouter);

////////////////////////////////////////////////////////////////////////

const seriesMockRouter = require('./routes/seriesmock');
app.use(seriesMockRouter);

const seriesRouter = require("./routes/series");
app.use(seriesRouter);

///////////////////////////////////////////////////////////////////////

const capitulosMockRouter = require('./routes/capitulosmock');
app.use(capitulosMockRouter);

const capitulosRouter = require("./routes/capitulos");
app.use(capitulosRouter);

///////////////////////////////////////////////////////////////////////

const productoraMockRouter = require('./routes/productoramock');
app.use(productoraMockRouter);

const productoraRouter = require("./routes/productora");
app.use(productoraRouter);

////////////////////////////////////////////////////////////////////////


const peliculasMockRouter = require('./routes/peliculasmock');
app.use(peliculasMockRouter);

const peliculasRouter = require("./routes/peliculas");
app.use(peliculasRouter);

////////////////////////////////////////////////////////////////////////

const actoresMockRouter = require('./routes/actoresMock');
app.use(actoresMockRouter);

const actoresRouter = require("./routes/actores");
app.use(actoresRouter);


////////////////////////////////////////////////////////////////////////
// levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
