import React from 'react'
import'./addProduct.css'

function AddProduct ({ onAddProduct })  {
    return (
        <div className="add-container">
            <button onClick={onAddProduct} className="add-button">
                <span>+</span>
            </button>
        </div>
    )
}

export default AddProduct