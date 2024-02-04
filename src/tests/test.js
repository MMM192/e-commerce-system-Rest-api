 
const assert = require('assert');
const request = require('supertest');
const app = require('../../server');

describe('E-commerce API', () => {



    it(' create a new product', async () => {
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





    it('retrieve all products', async () => {
        const response = await request(app)
            .get('/api/products');

        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
    });

    it('search products by name ', async () => {
        const response = await request(app)
            .get('/api/products/search')
            .query({ name: 'Product 1' });

        assert.strictEqual(response.status, 200);
        assert(Array.isArray(response.body));
        assert(response.body.length > 0);
    });


























    it('update a product by name', async () => {
        const productNameToUpdate = 'Product 1';
        const updatedProductData = {
            description: 'Updated Product 1 Description',
            price: 65.00
        };

        const updateResponse = await request(app)
            .put(`/api/products/name/${productNameToUpdate}`)
            .send(updatedProductData);

        assert.strictEqual(updateResponse.status, 200);


        // Optionally, you can add additional assertions to check the updated data if needed
    });






















    it('create a new variant ', async () => {
        const productname2 = 'Product 1';

        const response = await request(app)
            .post(`/api/products/${productname2}/variants`)
            .send({

                name: 'Variant 2',
                sku: 'SKU123',
                additionalCost: 5.00,
                stockCount: 10
            });

        assert.strictEqual(response.status, 201);

    });







    it('update a variant', async () => {
        // Define product and variant information
        const productName = 'Product 1';
        const variantName = 'Variant 1';

        // Updated variant data
        const updatedVariantData = {
            name: "ass",
            sku: 'SKU123',
            additionalCost: 5.00,
            stockCount: 20
        };

        // Make the request to update the variant
        const updateResponse = await request(app)
            .put(`/api/products/name/${productName}/variant/${variantName}`)
            .send(updatedVariantData);

        // Assert the response status
        assert.strictEqual(updateResponse.status, 200);
    });


    it('delete a varient by name', async () => {

        const deleteResponse = await request(app)
            .delete('/api/products/variants')
            .query({ productName: 'Product 1' })
            .query({ variantName: 'Variant 1' });
        assert.strictEqual(deleteResponse.status, 200);


    });




    it('delete a product by name', async () => {
        const productNameToDelete = 'Product 1';
        const deleteResponse = await request(app)
            .delete(`/api/products/name/${productNameToDelete}`);
        assert.strictEqual(deleteResponse.status, 200);
        assert.deepStrictEqual(deleteResponse.body, { message: 'Product deleted successfully' });

    });











});
