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

///////////////////////////////////////////////////////////////////////

const productoraMockRouter = require('./routes/productoramock');
app.use(productoraMockRouter);

const productoraRouter = require("./routes/productora");
app.use(productoraRouter);

////////////////////////////////////////////////////////////////////////


const peliculasMockRouter = require('./routes/peliculasmock');
app.use(peliculasMockRouter);

////////////////////////////////////////////////////////////////////////

// levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
