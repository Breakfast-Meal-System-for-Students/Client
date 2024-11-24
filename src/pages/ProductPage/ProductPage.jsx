import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductPage.scss';
import { useNavigate } from 'react-router-dom';
import { Alert, Grid } from '@mui/material';
import { ApiGetProductsByShopId } from '../../services/ProductServices';
const API = 'https://bms-fs-api.azurewebsites.net/api/Product'; // Base API URL

// Function to get products
const getProducts = async (shopId, searchTerm, pageIndex, pageSize) => {
    const url = `${API}/all-product-by-shop-id?id=${shopId}&search=${searchTerm}&isDesc=true&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    return data; // No need to access `.data` here
};

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        const shopId = localStorage.getItem('shopId');
        const token = localStorage.getItem('token');
        if (!shopId) {
            console.error('No shopId found in local storage');
            return;
        }
        const result = await ApiGetProductsByShopId(shopId, searchTerm, true, pageIndex, pageSize, token);
        if (result.ok) {
            setProducts(result.body.data.data);
            setTotalPages(result.body.data.lastPage || 0); 
        } else {
            alert(result.message);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products on component mount or when dependencies change
    }, [pageIndex, searchTerm]); // Re-fetch products when pageIndex or search term changes

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPageIndex(newPage); // Update the page index
        }
    };

    const handleAddProduct = () => {
        navigate('/shop/add-product'); // Navigate to add product page
    };

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            try {
                await fetch(`${API}/${productId}`, { method: 'DELETE' });
                fetchProducts(); // Re-fetch products after deletion
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const loading = false;
    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching user data
    }

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
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={6} sm={6} md={6} lg={4} xl={2} key={product.id}>
                        <ProductCard
                            product={{
                                id: product.id,
                                name: product.name,
                                description: product.description,
                                price: product.price,
                                imageUrl: product.images?.[0]?.url || '', // Safely check for images
                            }}
                            onEdit={fetchProducts}
                            onDelete={() => handleDeleteProduct(product.id)} // Pass delete handler
                        />
                    </Grid>
                ))}
            </Grid>
            {products && products.length > 0 && (
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
            ) || (
                <div className="text-center mt-4" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#555' }}>
                    No Products Found
                </div>
            )}
        </div>
    );
};

export default ProductPage;
