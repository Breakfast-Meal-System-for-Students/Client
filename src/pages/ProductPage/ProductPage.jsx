import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductPage.scss';
import { useNavigate } from 'react-router-dom';

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
        const shopId = localStorage.getItem('shopId'); // Retrieve shopId from local storage
        if (!shopId) {
            console.error('No shopId found in local storage');
            return;
        }

        try {
            const responseData = await getProducts(shopId, searchTerm, pageIndex, pageSize);
            console.log(responseData.data); 
            const productData = responseData?.data?.data; // Adjust based on the structure of the response
            if (productData) {
                setProducts(productData); // Set products if available
                setTotalPages(responseData?.data?.lastPage || 0); // Set total pages if available
            } else {
                console.error('Unexpected data structure', responseData);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
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
        navigate('/add-product'); // Navigate to add product page
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
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={{
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            price: product.price,
                            imageUrl: product.images?.[0]?.url || '', // Safely check for images
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
