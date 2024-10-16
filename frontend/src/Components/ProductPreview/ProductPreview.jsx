import React, { useState } from 'react';
import productData from './productData.json'; // adjust the path based on your file structure
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ProductPreview.css'
import AddProduct from '../AddProducts/AddProduct';
import {  useDispatch } from 'react-redux';
import { addToCart } from '../../stores/Carts/cartSlice';



const ProductPreview = ( ) => {
  const [product, setProduct] = useState([]);
  const products = productData.data;
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  
  const onAddProduct = (product) => {
    dispatch(addToCart(product))
}

const addProduct =() => {
  onAddProduct(product)
}

  return (
    <div className="products-preview-container">
      <div className="product-preview-contents">
      <Carousel responsive={responsive}>
        {products.map((product, img) => (
          <div key={product.id} className="product-card">
                 {product.images.length > 0 && (
              <div className="product-images">
                {product.images.map((img, index) => (
                  <div key={index} className="product-image-item">
            <img src={img.url} alt={img.title} className="additional-image" />
                  </div>
                ))}
              </div>
            )}
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-description line-clamp-4">{product.description}</p>
            <AddProduct onAddProduct={addProduct}/>

            {/* Display product images if available */}
       
          </div>
        ))}
      </Carousel>
      </div>
    </div>
  );
};

export default ProductPreview;
