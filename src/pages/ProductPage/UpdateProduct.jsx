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
        images: [],
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Lấy tất cả tệp hình ảnh
        const newImages = files.map(file => URL.createObjectURL(file)); // Tạo URL cho từng tệp
        setImageFiles(prev => [...prev, ...files]); // Cập nhật mảng file
        setUpdatedProduct(prev => ({
            ...prev,
            images: [...prev.images, ...newImages], // Cập nhật hình ảnh với URL mới
        }));
    };

    const handleRemoveImage = (index) => {
        const newFiles = [...imageFiles];
        newFiles.splice(index, 1); // Xóa file tại chỉ số index
        const newImages = [...updatedProduct.images];
        newImages.splice(index, 1); // Xóa URL hình ảnh tương ứng
        setImageFiles(newFiles);
        setUpdatedProduct(prev => ({ ...prev, images: newImages }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await ApiUpdateProduct(updatedProduct, product.id);
        if (result.ok) {
            alert('Dish updated successfully.');
            onSave();
            onClose();
        } else {
            alert(result.message);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Edit Product</Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Product Name"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    <TextField
                            label="Description"
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            required
                        />
                    <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={updatedProduct.price}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                     <Box>
                            <Typography variant="subtitle1" gutterBottom>
                                Product Images *
                            </Typography>
                            <Button
                                variant="contained"
                                component="label"
                            >
                                Upload Images
                                <input
                                    name="images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={handleImageChange}
                                />
                                </Button>
                            {errors.image && (
                                <Tooltip title={errors.image} arrow>
                                    <Typography color="error" variant="caption">
                                        {errors.image}
                                    </Typography>
                                </Tooltip>
                            )}
                            <Grid container spacing={2} marginTop={1}>
                                {imageFiles.map((file, index) => (
                                    <Grid item key={index}>
                                        <Box display="flex" alignItems="center" flexDirection="column">
                                            <Avatar
                                                src={URL.createObjectURL(file)}
                                                alt={`image-${index}`}
                                                sx={{ width: 64, height: 64, marginBottom: 1 }}
                                            />
                                            <IconButton
                                                color="error"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                    <Button onClick={onClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UpdateProduct;
/*
     const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (index, value) => {
    const newImages = [...updatedProduct.images];
    newImages[index] = value;
    setUpdatedProduct((prev) => ({ ...prev, images: newImages }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedProduct);
  };
*/
