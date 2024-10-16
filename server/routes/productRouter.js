// const express = require('express')

// const router = express.Router()

// const Product = require('../models/productModel')

// router.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find()
//         res.status(200).send({ data: products})
//     } catch (err) {
//         res.status(400).send({ error: err})
//     }
// })


// module.exports = router

const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models/productModel');

// GET products route
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).send({ data: products });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

// POST route to add new product
router.post('/products', async (req, res) => {
    const { name, adjective, description, price, categoryId } = req.body;
    try {
        // Find category by ID
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).send({ message: 'Category not found' });
        }

        // Create new product
        const newProduct = new Product({
            name,
            adjective,
            description,
            price,
            category: categoryId,
        });

        await newProduct.save();
        res.status(201).send({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;
