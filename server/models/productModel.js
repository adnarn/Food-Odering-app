const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Product schema
const ProductSchema = new Schema({
    name: { type: String, required: true },
    imgurl: { type: String, required: true },
    description: { type: String, required: true },  // Fixed typo from 'desciption' to 'description'
    price: { type: String, required: true },
    category: String  

});

// Exporting both models
// const Category = mongoose.model('Category', CategorySchema);
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

