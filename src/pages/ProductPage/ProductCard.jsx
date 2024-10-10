import React from 'react';
import './ProductPage.scss';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <img src={product.images[0].url} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">
          {product.name} <span className="product-price">${product.price}</span>
        </h3>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <button className="edit-btn" onClick={() => onEdit(product.id)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
