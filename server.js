// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5001;



mongoose.connect('mongodb+srv://mendhudlemalasidha52:BqcWoubhguZnEle7@backend1-db.erlhti4.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

app.use('/api', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




module.exports = app;