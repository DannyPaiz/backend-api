const request = require('supertest');
const { sequelize } = require('../models/Product');
const app = require('../server'); // Ensure server.js exports the app
    // const seed = require('../db/seedFn');


describe('Products API', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset the DB before tests
    // await seed();
  });

  afterAll(async () => {
    await sequelize.close(); // Close DB connection after tests
  });

  it('should create a new product', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Test Product', price: 10.99 });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Test Product');
  });

  it('should retrieve all products', async () => {
    const response = await request(app).get('/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('should get a specific product by id', async () => {
    const createResponse = await request(app)
      .post('/products')
      .send({ name: 'Another Product', price: 15.99 });
    
    const productId = createResponse.body.id;
    const getResponse = await request(app).get(`/products/${productId}`);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.name).toBe('Another Product');
  });

  it('should update a product', async () => {
    const createResponse = await request(app)
      .post('/products')
      .send({ name: 'Product To Update', price: 20.99 });

    const productId = createResponse.body.id;
    const updateResponse = await request(app)
      .put(`/products/${productId}`)
      .send({ name: 'Updated Product', price: 25.99 });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.name).toBe('Updated Product');
  });

  it('should delete a product', async () => {
    const createResponse = await request(app)
      .post('/products')
      .send({ name: 'Product To Delete', price: 5.99 });

    const productId = createResponse.body.id;
    const deleteResponse = await request(app).delete(`/products/${productId}`);

    expect(deleteResponse.statusCode).toBe(204);
  });
});