import React, { useState } from 'react';
import axios from 'axios';
import './UpdateProduct.scss';

const UpdateProduct = ({ product, onClose, onSave }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        images: product.images || [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({
            ...updatedProduct,
            [name]: value,
        });
    };

    const handleImageChange = (index, newUrl) => {
        const newImages = [...updatedProduct.images];
        newImages[index] = newUrl;
        setUpdatedProduct({ ...updatedProduct, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra xem có trường nào được thay đổi hay không
        const isUnchanged = (
            updatedProduct.name === product.name &&
            updatedProduct.description === product.description &&
            updatedProduct.price === product.price &&
            JSON.stringify(updatedProduct.images) === JSON.stringify(product.images)
        );

        if (isUnchanged) {
            alert('No changes made. Please update at least one field.'); // Thông báo cho người dùng
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', updatedProduct.name);
            formData.append('description', updatedProduct.description);
            formData.append('price', updatedProduct.price);

            updatedProduct.images.forEach((img, index) => {
                formData.append(`images[${index}]`, img);
            });

            const response = await axios.put(
                `https://bms-fs-api.azurewebsites.net/api/Product/${product.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Product updated successfully:', response.data);
            alert('Cập nhật món thành công!'); // Thông báo thành công
            onSave(product.id, updatedProduct);
            onClose();
        } catch (error) {
            console.error('Error updating product:', error.response ? error.response.data : error.message);
            alert('Có lỗi xảy ra trong quá trình cập nhật món. Vui lòng thử lại.'); // Thông báo lỗi
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <h2>Edit Product</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Description</label>
                        <textarea
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Images</label>
                        {updatedProduct.images.map((img, index) => (
                            <div key={index} className="image-input">
                                <input
                                    type="text"
                                    value={img}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                />
                                <button type="button" onClick={() => handleImageChange(index, '')}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="save-button">Save</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
