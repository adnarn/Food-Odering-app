import React, { useState } from 'react';
import axios from 'axios';
import './AddDetails.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';


const AddDetails = () => {
  const [productData, setProductData] = useState({
    name: '',
    imgurl: '',
    description: '',
    price: '',
    category: '',
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/add-product', productData)
      .then(response => {
        console.log(response);
        toast.success('Product added successfully!');
        setProductData({
          name: '',
          imgurl: '',
          description: '',
          price: '',
          category: '',
        });
      })
      .catch(error => {
        toast.error('Error adding product:', error);
        console.log('Failed to add product');
      });
  };

  return (
    <div className="add-product-container">
      <div className="add-product-box">
        <h2 className="add-product-title">Add New Product</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imgurl" className="form-label">IMG URL</label>
            <input
              type="text"
              name="imgurl"
              value={productData.imgurl}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button className="add-product-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDetails;
