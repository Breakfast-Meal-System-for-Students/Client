import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductPage.scss';
function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    // Fetch products from the API
    axios
      .get(`https://bms-fs-api.azurewebsites.net/api/Product?search=${searchQuery}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
      .then((response) => {
        setProducts(response.data.items); // Adjust for API response structure
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [searchQuery, pageIndex, pageSize]);

  return (
    <div className="product-page">
      <div className="header">
        <h1>Foods</h1>
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="add-product-button">+ New Menu</button>
        <button className="filter-button">Filter</button>
      </div>
      <div className="product-grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 1}>Prev</button>
        <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
      </div>
    </div>
  );
}

export default ProductPage;
