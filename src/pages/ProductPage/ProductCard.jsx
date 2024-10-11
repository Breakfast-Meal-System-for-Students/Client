import React from 'react';
import './ProductPage.scss'; // Make sure you have this file created for card-specific styles

const ProductCard = ({ name, price, description, images }) => {
  return (
    <div className="product-card">
      <img src={images[0]?.url || 'default_image_url.jpg'} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">
          {name} <span className="product-price">${price}</span>
        </h3>
        <p className="product-description">{description}</p>
        <div className="product-actions">
          <button className="edit-btn">Edit</button>
          <button className="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
