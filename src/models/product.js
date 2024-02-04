const mongoose = require('mongoose');


/*
mongoose.connect('mongodb+srv://mendhudlemalasidha52:BqcWoubhguZnEle7@backend1-db.erlhti4.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

const variantSchema = new mongoose.Schema({
    name: String,
    sku: String,
    additionalCost: Number,
    stockCount: Number,
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    variants: [variantSchema],
});

const Product = mongoose.model('Product3', productSchema);








module.exports = Product;