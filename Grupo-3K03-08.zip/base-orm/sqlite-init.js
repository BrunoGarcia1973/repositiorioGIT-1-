// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/pymes.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'productora'",
    []
  );

  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table productora( 
              CodigoProd INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Fecha_nacimiento text,
            );`
    );
    console.log("tabla productora creada!");
    await db.run(
      `insert into productora values
      (0123, 'Rodrigo', '1973-05-24'),
      (0223, 'Ulises', '1986-05-22'),
      (0323, 'Cristian', '1970-05-24'),
      (0423, 'Damian', '1990-04-17'),
      (0523, 'Euguenia', '1950-12-24'),
      (0623, 'Magali', '1973-05-24'),
      (0723, 'Cristina', '2000-05-30'),
      (0823, 'Rufino', '1952-02-01'),
      (0923, 'Anabela', '1973-05-22'),
      (0233, 'Vanesa', '1993-11-19');`
    );
  
  }
  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'documentales'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table documentales( 
              Codigo INTEGER PRIMARY KEY AUTOINCREMENT
            , CodigoProd integer
            , Nombre text NOT NULL UNIQUE
            , Fecha_lanzamiento text,
            FOREIGN KEY (CodigoProd) REFERENCES productora(CodigoProd)
            );`
    );


    console.log("tabla documentales creada!");
    await db.run(
      `insert into articulos values
        (11111, 0123, 'Animales salvajes', '2021-02-18'),
        (22222, 0223, 'Animales pasivos', '2021-06-23'),
        (33333, 0323, 'La primera guerra mundial', '2021-02-22'),
        (44444, 0423, 'La vida de Hitler', '2019-05-24'),
        (55555, 0523, 'El 2001 de Argentina', '2022-02-22'),
        (66666, 0623, 'Historia Argentina', '2020-12-30'),
        (77777, 0723, 'Etapa de industrializacion', '2023-09-01'),
        (88888, 0823, 'El frio de la Antartida', '1997-08-25'),
        (99999, 0923, 'La vida de Rodrigo Bueno El Potro', '2011-02-18'),
        (12345, 0233, 'La historia del Cuarteto', '2020-06-19');`
         
    );
 }
 // cerrar la base
 db.close();

}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;