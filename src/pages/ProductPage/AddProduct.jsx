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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate trước khi lưu sản phẩm
        const validationErrors = {};
        if (!productName) validationErrors.productName = 'Product name is required';
        if (!price) validationErrors.price = 'Price is required';
        if (!description) validationErrors.description = 'Description is required';
        if (!image) validationErrors.image = 'Product image is required';

        // Kiểm tra nếu có lỗi
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Nếu không có lỗi, thêm sản phẩm mới
        console.log('Product added:', { productName, price, description, image });

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
