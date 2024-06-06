const request = require('supertest');
const app = require('../index');

describe('GET /api/productora', function () {
  it('Devolveria todos los productora', async function () {
    const res = await request(app)
      .get('/api/productora')
      .set('content-type', 'application/json');
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          CodigoProd: expect.any(Number),
          Nombre: expect.any(String),
          Fecha_nacimiento: expect.any(String),
        }),
      ])
    );
  });
});

describe('GET /api/productora/:codigoProd', function () {
  it('respond with json containing a single productora', async function () {
    const res = await request(app).get('/api/productora/1123');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        CodigoDocumentales: 1123,
        Nombre: expect.any(String),
        Fecha_nacimiento: expect.any(String),
      })
    );
  });
});
