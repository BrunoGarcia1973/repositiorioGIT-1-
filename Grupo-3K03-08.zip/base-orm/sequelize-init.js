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






module.exports = {
    sequelize,
    productora,
    documentales,
  };
