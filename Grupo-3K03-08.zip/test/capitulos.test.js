const request = require("supertest");
const app = require("../index");
const capitulosAlta = {
  Nombre: `Capítulo aleatorio ${Math.floor(Math.random() * 1000)}`,
  Codigo: 12345,
  CodigoCapitulo: 9999,
  Duracion: "1:23:45",
  Activo: true,
};
const capitulosModificacion = {
    Nombre: `Capítulo aleatorio ${Math.floor(Math.random() * 1000)}`,
    Codigo: 12345,
    CodigoCapitulo: 9999,
    Duracion: "2:34:56",
    Activo: true,
};

// test route/productora GET
describe("GET /api/capitulos", () => {
  it("Deberia devolver todas los capitulos", async () => {
    const res = await request(app).get("/api/capitulos");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            CodigoCapitulo: expect.any(Number),
            Codigo: expect.any(Number),
            Nombre: expect.any(String),
            Duracion: expect.any(String),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/productora GET
describe("GET /api/capitulos con filtros", () => {
  it("Deberia devolver las capitulos según filtro ", async () => {
    const res = await request(app).get("/api/capitulos?Nombre=Terremoto&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("Terremoto") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
  });
});

// test route/capitulos/:codigoCapitulo GET
describe("GET /api/capitulos/:codigoCapitulo", () => {
  it("Deberia devolver lel capitulo con el codigo 10000", async () => {
    const res = await request(app).get("/api/capitulos/10000");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Codigo:10000,
        CodigoCapitulo: expect.any(Number),
        Nombre: expect.any(String),
        Duracion: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/productora POST
describe("POST /api/capitulos", () => {
  it("Deberia devolver el capitulo que acabo de crear", async () => {
    const res = await request(app).post("/api/capitulos").send(capitulosAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoCapitulo: expect.any(Number),
        Nombre: expect.any(String),
        Duracion: expect.any(String),
        Activo: expect.any(Boolean),
        Codigo: expect.any(Number),
      })
    );
  });
});

// test route/capitulos/:codigoCapitulo PUT
describe("PUT /api/capitulos/:codigoCapitulo", () => {
  it("Deberia devolver el capitulo con el codigo 10000 modificado", async () => {
    const res = await request(app)
      .put("/api/capitulos/10000")
      .send(capitulosModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/productora/:codigoProd DELETE
describe("DELETE /api/capitulos/:codigoCapitulo", () => {
  it("Debería devolver el capitulo con el codigo 10000 borrado", async () => {
    const res = await request(app).delete("/api/capitulos/10000");
    expect(res.statusCode).toEqual(200);
  });
});
