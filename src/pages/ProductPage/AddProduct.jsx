import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProductPage.scss';

const AddProductPage = () => {
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form inputs
        const validationErrors = {};
        if (!productName) validationErrors.productName = 'Product name is required';
        if (!price) validationErrors.price = 'Price is required';
        if (!description) validationErrors.description = 'Description is required';
        if (!image) validationErrors.image = 'Product image is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Get the shopId from localStorage
        const shopId = localStorage.getItem('shopId');
        if (!shopId) {
            alert('No shop ID found. Please log in as a shop.');
            return;
        }

        // Create FormData object to send the image and product details
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('shopId', shopId);
        formData.append('image', image); // Ensure this matches the expected API key for the image

        // Log the FormData contents for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            // Send a POST request to add the product
            const response = await fetch('https://bms-fs-api.azurewebsites.net/api/Product', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (response.ok && data.isSuccess) {
                alert('Product added successfully');
                navigate('/Menu');
            } else {
                alert('Failed to add product: ' + (data.message || 'Unknown error'));
                console.error('Response error:', data);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            alert('An error occurred while adding the product');
        }

        // Clear form inputs
        setProductName('');
        setPrice('');
        setDescription('');
        setImage(null);
        setErrors({});
    };

    const handleCancel = () => {
        navigate('/Menu');
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="add-product-page">
            <h1>Add New Product</h1>
            <form className="add-product-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    {errors.productName && <p className="error">{errors.productName}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Brief description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {errors.image && <p className="error">{errors.image}</p>}
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;
