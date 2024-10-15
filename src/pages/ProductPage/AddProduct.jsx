import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProductPage.scss';

const AddProductPage = () => {
    const navigate = useNavigate();

    // State để lưu trữ thông tin sản phẩm và kiểm tra lỗi
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // State để theo dõi lỗi trong form
    const [errors, setErrors] = useState({});

    // Xử lý khi người dùng submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate trước khi lưu sản phẩm
        const validationErrors = {};
        if (!productName) validationErrors.productName = 'Product name is required';
        if (!price) validationErrors.price = 'Price is required';
        if (!description) validationErrors.description = 'Description is required';

        // Kiểm tra nếu có lỗi
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Nếu không có lỗi, thêm sản phẩm mới (gửi request API, v.v.)
        console.log('Product added:', { productName, price, description });

        // Reset form sau khi thêm sản phẩm thành công
        setProductName('');
        setPrice('');
        setDescription('');
        setErrors({}); // Reset lỗi sau khi thành công
    };

    // Xử lý khi người dùng nhấn nút Cancel
    const handleCancel = () => {
        navigate('/Menu');  // Điều hướng về trang ProductPage
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
                <div className="form-actions">
                    <button type="submit" className="submit-button">Save</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;
