import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductStyle.scss';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(6); // Set the limit to 6 products per page
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://bms-fs-api.azurewebsites.net/api/Product?search=${searchTerm}&isDesc=true&pageIndex=${pageIndex}&pageSize=${pageSize}`);
            console.log('API Response:', response.data);
            setProducts(Array.isArray(response.data.data) ? response.data.data : []);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [pageIndex, searchTerm]);

    const handlePageChange = (newPage) => {
        // Check if the newPage is within the valid range
        if (newPage >= 1 && newPage <= totalPages) {
            setPageIndex(newPage);
        }
    };

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    return (
        <div className="product-page">
            <h1>Product List</h1>
            <div className="product-controls">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="add-product-button" onClick={handleAddProduct}>
                    <span className="add-icon">➕</span> Add Product
                </button>
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}  
                        onEdit={() => console.log('Edit product', product.id)}
                        onDelete={() => console.log('Delete product', product.id)}
                    />
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(pageIndex - 1)}
                    disabled={pageIndex <= 1}
                >
                    Previous
                </button>
                <span>Page {pageIndex} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(pageIndex + 1)}
                    disabled={pageIndex >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
