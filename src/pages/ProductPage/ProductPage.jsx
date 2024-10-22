import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductPage.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const ProductPage = () => {
    const { data, loading } = useAuth(); // Access the user context
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    
    
    const fetchProducts = async () => {
        const shopId = localStorage.getItem('shopId'); // Retrieve shopId from local storage
        if (!shopId) {
            console.error('No shopId found in local storage');
            return;
        }

        const url = `https://bms-fs-api.azurewebsites.net/api/Product/all-product-by-shop-id?id=${shopId}&search=${searchTerm}&isDesc=true&pageIndex=${pageIndex}&pageSize=${pageSize}`;
        
        try {
            const response = await axios.get(url);
            const responseData = response.data.data;
            
            // Update state with the fetched products and pagination info
            setProducts(responseData.data); // Product list
            setTotalPages(responseData.lastPage); // Total number of pages
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products on component mount
    }, [pageIndex, searchTerm]); // Re-fetch products when pageIndex or search term changes

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPageIndex(newPage); // Update the page index
        }
    };

    const handleAddProduct = () => {
        navigate('/add-product'); // Navigate to add product page
    };

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            try {
                await axios.delete(`https://bms-fs-api.azurewebsites.net/api/Product/${productId}`);
                fetchProducts(); // Re-fetch products after deletion
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

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
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                    key={product.id}
                    product={{
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        imageUrl: product.images && product.images.length > 0 ? product.images[0].url : '', // Safely check for images
                    }}
                    onEdit={() => console.log('Edit product', product.id)}
                    onDelete={() => handleDeleteProduct(product.id)} // Pass delete handler
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
