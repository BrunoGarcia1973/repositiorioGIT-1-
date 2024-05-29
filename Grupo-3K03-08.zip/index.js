const express = require('express');

// crear servidor
const app = express();

// controlar ruta
app.get('/', (req, res) => {
  res.send('Backend inicial dds-backend!');
});

const alumnossmockRouter = require('./routes/alumnosmock');
app.use(alumnossmockRouter);

const parcialesmockRouter = require('./routes/parcialesmock');
app.use(parcialesmockRouter);

app.use(express.json());

// levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
