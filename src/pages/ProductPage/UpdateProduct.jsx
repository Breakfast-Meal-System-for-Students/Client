import React, { useState } from 'react';
import axios from 'axios';
import './UpdateProduct.scss';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, IconButton, Box, Typography, Grid,
    Tooltip, Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApiUpdateProduct } from '../../services/ProductServices';

const UpdateProduct = ({ product, onClose, onSave }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        images: product.images || [],
    });
    const [errors, setErrors] = useState({});
    const [imageFiles, setImageFiles] = useState([]);
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

    const handleRemoveImage = (index) => {
        const newFiles = [...imageFiles];
        newFiles.splice(index, 1);
        setImageFiles(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await ApiUpdateProduct(updatedProduct, product.id);
        if (result.ok) {
            alert('Dish updated successfully.');
            onSave(product.id, updatedProduct);
            onClose();
        } else {
            alert(result.message);
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
                            className='input-text-update'
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
                            className='input-textarea-update'
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="label">Price</label>
                        <input
                            className='input-number-update'
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
                                    className='input-text-update'
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
