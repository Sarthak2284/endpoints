const request = require('supertest');
const app = require('../src/app');

describe('Data Ingestion API', () => {
  let ingestionId;

  it('should ingest IDs and return ingestion_id', async () => {
    const res = await request(app)
      .post('/ingest')
      .send({ ids: ['1', '2', '3', '4'], priority: 'HIGH' });

    expect(res.statusCode).toBe(200);
    expect(res.body.ingestion_id).toBeDefined();
    ingestionId = res.body.ingestion_id;
  });

  it('should return ingestion status', async () => {
    const res = await request(app).get(`/status/${ingestionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.ingestion_id).toBe(ingestionId);
  });
});
