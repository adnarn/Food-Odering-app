const express = require("express");
const bodyParser = require("body-parser");  // You can use this if needed for URL-encoded data
const cors = require("cors");
const productRouter = require("./routes/productRouter");
const productModel = require('./models/productModel')

const db = require('./Config/dbConfig');  // Ensure your MongoDB connection is here

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.json());  // Parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data if needed
app.use(cors());  // Enable CORS

// Use routers
app.use('/api/products', productRouter);  // Product-related routes


app.post( '/add-product', (req, res) => {
    productModel.create(req.body)
    .then(users => res.json(users))
    .catch(error => res.json(error))
       
  })

// Add a route to fetch products
app.get('/api/products', async (req, res) => {
    try {
        const products = await productModel.find();  // Fetch all products from the DB
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Hello, the server is running at port ${PORT}`);
});


