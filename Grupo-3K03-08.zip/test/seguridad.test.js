onst request = require("supertest");
const app = require("../index");

const usuarioAdmin = { usuario: "admin", clave: "123" };
const usuarioMiembro = { usuario: "juan", clave: "123" };


describe("POST /api/login admin", function () {
  it("Devolveria error de autenticacion, porque tiene clave errónea", async function () {
    const res = await request(app)
      .post("/api/login")
      //.set("Content-type", "application/json")
      .send({ usuario: "admin", clave: "errónea" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("usuario or clave incorrecto");
  });

  it("Devolvería el token para usuario admin", async function () {
    const res = await request(app).post("/api/login").send(usuarioAdmin);

    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
  });
});
