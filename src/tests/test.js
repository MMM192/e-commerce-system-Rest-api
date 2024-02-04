// tests.js

const assert = require('assert');
const request = require('supertest');
const app = require('../../server');

describe('E-commerce API', () => {
    it('should create a new product', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: 'Product 1',
                description: 'Product 1 description',
                price: 20.00,
                variants: [{ name: 'Variant 1', sku: 'SKU123', additionalCost: 5.00, stockCount: 10 }]
            });

        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.body.name, 'Product 1');
    });

    it('should retrieve all products', async () => {
        const response = await request(app)
            .get('/api/products');

        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
    });

    it('search products by name ', async () => {
        const response = await request(app)
            .get('/api/products/search')
            .query({ name: 'Quantum Smartwatch' });

        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
        assert(response.body.length > 0);
    });


    it('add new vari ', async () => {
        const response = await request(app)
            .get('/api/products/search')
            .query({ name: 'Quantum Smartwatch' });

        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
        assert(response.body.length > 0);
    });














});
