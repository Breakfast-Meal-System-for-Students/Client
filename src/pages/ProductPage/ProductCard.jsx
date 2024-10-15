import React from 'react';
import './ProductStyle.scss';

const ProductCard = ({ product, onEdit, onDelete }) => {
    if (!product) return <div>No product found.</div>;

    return (
        <div className="product-card">
            {/* Display product image */}
            <img 
                src={product.images[0]?.url || 'default-image-url.jpg'} 
                alt={product.name} 
                className="product-image" 
            />
            {/* Product name */}
            <h3>{product.name}</h3>
            {/* Product description */}
            <p>{product.description}</p>
            {/* Product price */}
            <p>Price: ${product.price.toFixed(2)}</p>
            <div className="card-actions">
                <button onClick={onEdit} className="edit-button">Edit</button>
                <button onClick={onDelete} className="delete-button">Delete</button>
            </div>
        </div>
    );
};

export default ProductCard;
