const request = require('supertest');
const app = require('../index');

describe('GET /api/series', function () {
  it('Devolveria todos las series', async function () {
    const res = await request(app)
      .get('/api/series')
      .set('content-type', 'application/json');
    expect(res.headers['content-type']).toEqual(
      'application/json; charset=utf-8'
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Codigo: expect.any(Number),
          Nombre: expect.any(String),
          FechaEstreno: expect.any(String),
        }),
      ])
    );
  });
});

describe('GET /api/series/:codigo', function () {
  it('respond with json containing a single series', async function () {
    const res = await request(app).get('/api/series/10000');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Codigo: 11111,
        Nombre: expect.any(String),
        FechaEstreno: expect.any(String),
      })
    );
  });
});
