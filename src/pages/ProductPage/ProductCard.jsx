import React, { useState } from 'react';
import './ProductCard.scss';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UpdateProduct from './UpdateProduct';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const ProductCard = ({ product, onDelete }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleEdit = () => {
        setPopupOpen(true);
    };

    const handleSave = async (id, updatedProduct) => {
        try {
            const response = await fetch(`https://bms-fs-api.azurewebsites.net/api/Product/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                alert('Product updated successfully!');
                // Có thể cần cập nhật lại danh sách sản phẩm ở đây
            } else {
                alert('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product.');
        } finally {
            setPopupOpen(false);
        }
    };

    return (
        <div className="product-card" style={{height:450}}>
            <img style={{width:'100%',height:170,objectFit:'cover'}}
                src={product.imageUrl || 'default-image-url.jpg'} 
                alt={product.name} 
                className="product-image" 
            />
            <div style={{height:150}}>
                <h3>{product.name}</h3>
                <p>Price: ${product.price?.toFixed(2)}</p>
                <p>{product.description}</p>
            </div>
            
            <div className="card-actions">
                <button onClick={handleEdit} className="edit-button">
                    <BorderColorIcon/>
                </button>
                <button onClick={onDelete} className="delete-button">
                    <DeleteOutlineIcon/>
                </button>
            </div>
            {isPopupOpen && 
                <UpdateProduct 
                    product={product} 
                    onClose={() => setPopupOpen(false)} 
                    onSave={handleSave} 
                />
            }
        </div>
    );
};

export default ProductCard;
