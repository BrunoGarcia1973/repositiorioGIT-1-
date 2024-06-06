// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/pymes.db");

// definicion del modelo de datos
const productora = sequelize.define(
  "productora",
  {
    CodigoProd: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fecha_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha de Nacimiento es requerido",
          }
        }
      },
  
    Nombre: {
        // todo evitar que string autocomplete con espacios en blanco, debería ser varchar sin espacios
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nombre es requerido",
          },
          len: {
            args: [5, 30],
            msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
          },
        },
      },
    },
  );
  const documentales = sequelize.define(
    "documentales",
    {
      Codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nombre es requerido",
          },
          len: {
            args: [5, 60],
            msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
          },
        },
        unique: {
          args: true,
          msg: "este Nombre ya existe en la tabla!",
        },
      },
      CodigoProd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "CodigoProd es requerido",
          }
        }
      },
      Fecha_lanzamiento: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha de lanzamiento es requerido",
          }
        }
      },
    }
);

const series = sequelize.define(
  "series",
  {
    Codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    FechaEstreno: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de Estreno es requerido",
        }
      }
    },
  },
  {
    timestamps: false,
    tableName: 'series'
  }
);

const capitulos = sequelize.define(
  "capitulos",
  {
    CodigoCapitulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
    Codigo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Codigo de Serie es requerido",
        }
      },
      references: {
        model: 'series',
        key: 'Codigo'
      }
    },
    Duracion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Duración es requerida",
        }
      }
    },
  },
  {
    timestamps: false,
    tableName: 'capitulos'
  }
);


const peliculas = sequelize.define(
  "peliculas",
  {
    CodigoPel: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de la pelicula es requerido",
        },
        len: {
          args: [5, 30],
          msg: "El nombre de la pelicula debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
    },
    Fecha_lanzamiento: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "La fecha de Lanzamiento de la pelicula es requerido",
        }
      }
    },
  },
);


const actores = sequelize.define(
  "actores",
  {
    CodigoAct: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CodigoPel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El Codigo de actor es requerido",
        }
      }
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de el actor es requerido",
        },
        len: {
          args: [5, 60],
          msg: "El nombre de el actor debe ser tipo caracteres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "Este Nombre ya existe en la tabla!",
      },
    },
    Fecha_nacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "La fecha de nacimiento es requerido",
        }
      }
    },
  }
);


module.exports = {
    sequelize,
    productora,
    documentales,
    series,
    capitulos,
    peliculas,
    actores,
  };
