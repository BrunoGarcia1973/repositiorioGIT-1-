// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/pymes.db");
  //await db.open(process.env.base);

  let existe = false;
  let res = null;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'usuarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);"
    );
    console.log("tabla usuarios creada!");
    await db.run(
      "insert into usuarios values	(1,'admin','123','admin'),(2,'juan','123','member');"
    );
  }

  existe = false;



  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'documentales'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table documentales( 
              Codigo INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Fecha_lanzamiento text,
            );`
    );


    console.log("tabla documentales creada!");
    await db.run(
      `insert into documentales values
        (11111, 'Animales salvajes', '2021-02-18'),
        (22222, 'Animales pasivos', '2021-06-23'),
        (33333, 'La primera guerra mundial', '2021-02-22'),
        (44444, 'La vida de Hitler', '2019-05-24'),
        (55555, 'El 2001 de Argentina', '2022-02-22'),
        (66666, 'Historia Argentina', '2020-12-30'),
        (77777, 'Etapa de industrializacion', '2023-09-01'),
        (88888, 'El frio de la Antartida', '1997-08-25'),
        (99999, 'La vida de Rodrigo Bueno El Potro', '2011-02-18'),
        (12345, 'La historia del Cuarteto', '2020-06-19');`
         
    );
 }
 existe = false;
 sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'productora'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table productora( 
            CodigoProd INTEGER PRIMARY KEY AUTOINCREMENT
          , Nombre text NOT NULL UNIQUE
          , Fecha_nacimiento text
          , Activo boolean
          , Codigo integer,
           FOREIGN KEY (Codigo) REFERENCES documentales(Codigo)
          );`
  );
  console.log("tabla productora creada!");
  await db.run(
    `insert into productora values
    (1123, 'Rodrigo', '1973-05-24', 1, 11111),
    (1223, 'Ulises', '1986-05-22', 1, 22222),
    (1323, 'Cristian', '1970-05-24', 1, 33333),
    (1423, 'Damian', '1990-04-17', 1, 44444),
    (1523, 'Euguenia', '1950-12-24', 1, 55555),
    (1623, 'Magali', '1973-05-24', 1, 66666),
    (1723, 'Cristina', '2000-05-30', 1, 77777),
    (1823, 'Rufino', '1952-02-01', 1, 88888),
    (1923, 'Anabela', '1973-05-22', 99999),
    (1233, 'Vanesa', '1993-11-19', 12345);`
  );

  // Crear tabla series si no existe
  existe = false;
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'series'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table series(
        Codigo INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre text NOT NULL UNIQUE,
        FechaEstreno text
      );`
    );
    console.log("tabla series creada!");
    await db.run(
      `insert into series values
        (10000, 'One Tree Hill', '2003-09-23'),
        (20000, 'Gilmore Girls', '2000-10-05'),
        (30000, 'Gossip Girl', '2007-09-19'),
        (40000, 'Friends', '1994-09-22'),
        (50000, 'Modern Family', '2009-09-23'),
        (60000, 'Game Of Thrones', '2011-04-17'),
        (70000, 'The Summer I Turned Pretty', '2022-06-17'),
        (80000, 'My Life With The Walter Boys', '2023-12-07'),
        (90000, 'Succession', '2018-06-03'),
        (10001, 'How I Met Your Mother', '2005-09-19');`
    );

  // Crear tabla capitulos si no existe
  existe = false;
  sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'capitulos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table capitulos(
        Codigo INTEGER PRIMARY KEY AUTOINCREMENT,
        CodigoCapitulo INTEGER,
        Nombre text NOT NULL,
        Duracion text
      );`
    );
    console.log("tabla capitulos creada!");
    await db.run(
      `insert into capitulos values
        (10000, 1000, 'De Repente echo de Menos a Todos', '42:00'),
        (20000, 2000, 'Written In The Stars', '43:00'),
        (30000, 3000, 'The Lost Boy', '42:00'),
        (40000, 4000, 'El Asistente de Rachel', '22:00'),
        (50000, 5000, 'Terremoto', '22:00'),
        (60000, 6000, 'The Gift', '53:00'),
        (70000, 7000, 'Amor perdido', '57:00'),
        (80000, 8000, 'Revolutions', '43:00'),
        (90000, 9000, 'Lion in the Meadow', '59:00'),
        (10001, 1111, 'El Padrino', '23:00');`
    );
  }
  }
}

 // cerrar la base
 db.close();
  
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;
