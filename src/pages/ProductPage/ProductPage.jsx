import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductPage.scss';

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API
    axios
      .get('https://bms-fs-api.azurewebsites.net/api/Product?search=a&pageIndex=1&pageSize=5')
      .then((response) => {
        console.log('API Response:', response.data); // Log the response for debugging
        setProducts(response.data); // Adjust this based on the response structure
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="product-page">
      <div className="header">
        <h1>Product List</h1>
        <button className="add-product-button">Add Product</button>
      </div>
      <div className="product-grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              images={product.images}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
