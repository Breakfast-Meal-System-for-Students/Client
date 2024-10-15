// ProductPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductStyle.scss';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(3); // Limit of products per page

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://bms-fs-api.azurewebsites.net/api/Product?search=a&isDesc=true&pageIndex=${pageIndex}&pageSize=${pageSize}`);
            console.log('API Response:', response.data);
            setProducts(Array.isArray(response.data.data) ? response.data.data : []);
            setTotalPages(response.data.totalPages); // Assuming the API returns the total pages
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [pageIndex]);

    const handlePageChange = (newPage) => {
        // Check if the newPage is within the valid range
        if (newPage >= 1 && newPage <= totalPages) {
            setPageIndex(newPage);
        }
    };

    return (
        <div className="product-page">
            <h1>Product List</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        productId={product.id} // Pass the product ID
                        onEdit={() => console.log('Edit product', product.id)}
                        onDelete={() => console.log('Delete product', product.id)}
                    />
                ))}
            </div>
            <div className="pagination">
                <button 
                    onClick={() => handlePageChange(pageIndex - 1)} 
                    disabled={pageIndex <= 1} // Disable if on the first page
                >
                    Previous
                </button>
                <span>Page {pageIndex} of {totalPages}</span>
                <button 
                    onClick={() => handlePageChange(pageIndex + 1)} 
                    disabled={pageIndex >= totalPages} // Disable if on the last page
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
