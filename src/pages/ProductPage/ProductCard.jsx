// ProductCard.jsx
import React, { useEffect, useState } from 'react';
import './ProductStyle.scss';

const ProductCard = ({ productId, onEdit, onDelete }) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product details based on the provided productId
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://bms-fs-api.azurewebsites.net/api/Product/${productId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data); // Assuming the API returns the product data directly
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]); // Fetch when productId changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching product: {error.message}</div>;
    if (!product) return <div>No product found.</div>;

    return (
        <div className="product-card">
            <img src={product.images[0]?.url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default ProductCard;
