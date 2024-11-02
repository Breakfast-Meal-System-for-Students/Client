import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCoupon.scss';

const AddCouponPage = () => {
    const navigate = useNavigate();
    const [name, setCouponName] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]); // Store multiple images
    const [errors, setErrors] = useState({});
    const [shopId, setShopId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const storedShopId = localStorage.getItem('shopId');
        if (storedShopId) {
            setShopId(storedShopId);
            console.log('Shop ID:', storedShopId);
        } else {
            alert('No shop ID found. Please log in as a shop.');
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!name) validationErrors.name = 'Coupon name is required';
        if (!discount) {
            validationErrors.discount = 'Discount is required';
        } else if (discount <= 0) {
            validationErrors.discount = 'Discount must be greater than 0';
        }
        if (!description) validationErrors.description = 'Description is required';
        if (images.length === 0) validationErrors.image = 'At least one coupon image is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!shopId) {
            alert('No shop ID found. Please log in as a shop.');
            return;
        }

        // Create a new FormData object for the image uploads
        const formData = new FormData();
        images.forEach(image => formData.append('images', image)); // Append all images

        try {
            console.log('Submitting coupon with details:', { name, discount, description, shopId });

            const response = await createCoupon({ name, description, discount, shopId }, formData);

            const data = await response.json();

            if (response.ok && data.isSuccess) {
                setSuccessMessage('Coupon added successfully!');
                setTimeout(() => {
                    navigate('/Coupon-page');
                }, 3000);
            } else {
                const errorMessages = Object.entries(data.errors).map(([key, value]) =>
                    `${key}: ${value.join(', ')}`
                ).join('\n');
                alert(`Failed to add coupon: ${data.title}\n${errorMessages}`);
            }
        } catch (error) {
            console.error('Error adding coupon:', error);
            alert('An error occurred while adding the coupon');
        }
    };

    const createCoupon = (couponDetails, formData) => {
        const { name, description, discount, shopId } = couponDetails;
        const url = `https://bms-fs-api.azurewebsites.net/api/Coupon?name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}&discount=${encodeURIComponent(discount)}&shopId=${encodeURIComponent(shopId)}`;

        return fetch(url, {
            method: 'POST',
            body: formData,
        });
    };

    const handleCancel = () => {
        navigate('/Coupon-page');
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prevImages => [...prevImages, ...files]); // Append new images
    };

    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index)); // Remove selected image
    };

    return (
        <div className="add-coupon-page">
            <h1 className="form-header">Add New Coupon</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="add-coupon-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="couponName">Coupon Name *</label>
                    <input
                        type="text"
                        id="couponName"
                        placeholder="Enter coupon name"
                        value={name}
                        onChange={(e) => setCouponName(e.target.value)}
                    />
                    {errors.name && <div className="error-tooltip">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="discount">Discount *</label>
                    <input
                        type="number"
                        id="discount"
                        placeholder="Enter discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                    />
                    {errors.discount && <div className="error-tooltip">{errors.discount}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description *</label>
                    <textarea
                        id="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <div className="error-tooltip">{errors.description}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="images">Coupon Images *</label>
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple // Allow multiple file selection
                        onChange={handleImageChange}
                    />
                    {errors.image && <div className="error-tooltip">{errors.image}</div>}
                    <div className="image-preview">
                        {images.map((image, index) => (
                            <div key={index} className="image-item">
                                <span>{image.name}</span>
                                <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-button">Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddCouponPage;
