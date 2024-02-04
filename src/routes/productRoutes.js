const express = require('express');
const router = express.Router();
const Product = require('../models/product');










// CRUD operations for Products
router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});









router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.get('/products/search', async (req, res) => {
    try {
        const name = req.query.name;

        /*
        const vv = req.query.description;
        const ss = req.query.variants;
        */

        // Use $regex instead of new RegExp for case-insensitive search
        const result = await Product.find({
            $or: [
                { name: { $regex: name, $options: 'i' } },
                /*
                { description: { $regex: vv, $options: 'i' } },
                { 'variants.name': { $regex: ss, $options: 'i' } },
                */
            ],
        });
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});









//update product by name
router.put('/products/name/:productName', async (req, res) => {
    try {
        const productName = req.params.productName;

        const result = await Product.updateMany({ name: productName }, { $set: req.body }, { new: true });

        if (result.nModified === 0) {
            res.status(404).json({ error: 'No products found with the given name' });
        } else {
            res.json({ message: 'Products updated successfully', updatedProducts: result });


        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});









// Delete Product by Name
router.delete('/products/name/:productName', async (req, res) => {
    try {
        const productName = req.params.productName;

        const product = await Product.findOneAndDelete({ name: productName });

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json({ message: 'Product deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});














// variant update 
router.put('/products/name/:productName/variant/:variantName', async (req, res) => {
    try {
        const productName = req.params.productName;
        const variantName = req.params.variantName;
        const result = await Product.updateOne(
            {
                name: productName,
                'variants.name': variantName
            },
            {
                $set: {
                    'variants.$.sku': req.body.sku,
                    'variants.$.additionalCost': req.body.additionalCost,
                    'variants.$.stockCount': req.body.stockCount
                }
            },
            { new: true }
        );
        if (result.nModified === 0) {
            res.status(404).json({ error: 'No products or variants found with the given name' });
        } else {
            res.json({ message: 'Variant updated successfully', updatedVariant: result });


        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});










// Updated Variant 1
router.delete('/products/variants', async (req, res) => {
    const productName = req.query.productName;
    const variantName = req.query.variantName;

    try {

        const product = await Product.findOne({ name: productName });

        if (product) {

            const variant = product.variants.find(v => v.name === variantName);

            if (variant) {

                product.variants.pull(variant._id);
                await product.save();
                res.status(200).json({ message: 'Variant deleted successfully.' });
            } else {
                res.status(404).json({ message: 'Variant not found.' });
            }
        } else {
            res.status(404).json({ message: 'Product not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});


















//   add a new variant to a product by product name
router.post('/products/:productName/variants', async (req, res) => {
    const productName = req.params.productName;
    try {

        const product = await Product.findOne({ name: productName });

        if (product) {

            const newVariant = {
                name: req.body.name,
                sku: req.body.sku,
                additionalCost: req.body.additionalCost,
                stockCount: req.body.stockCount
            };

            product.variants.push(newVariant);
            await product.save();

            res.status(201).json({ message: 'Variant added successfully.', variant: newVariant });
        } else {
            res.status(404).json({ message: 'Product not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});

















module.exports = router;
