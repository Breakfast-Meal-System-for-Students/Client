import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext'; // Assuming you're using this AuthContext to handle auth
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './AddCoupon.scss';

const AddCoupon = () => {
  const { token } = useAuth(); // Get token from AuthContext
  const [newCoupon, setNewCoupon] = useState({
    name: '',
    startDate: '',
    endDate: '',
    percentDiscount: '',
    maxDiscount: '',
    minPrice: '',
    minDiscount: ''
  });
  const navigate = useNavigate(); // Use useNavigate to navigate

  const handleInputChange = (e) => {
    setNewCoupon({
      ...newCoupon,
      [e.target.name]: e.target.value
    });
  };

  const addCoupon = async () => {
    try {
      const response = await axios.post('https://bms-fs-api.azurewebsites.net/api/Coupon', newCoupon, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token from AuthContext
        }
      });
      console.log( response.data);
      navigate('/coupons'); // Navigate to coupon list after successful addition
    } catch (error) {
      console.error('Failed to add coupon', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCoupon();
  };

  return (
    <div className="add-coupon-container">
      <h2 className="title">Add New Coupon</h2>
      <form className="add-coupon-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Coupon Name" onChange={handleInputChange} required />
        <input type="datetime-local" name="startDate" onChange={handleInputChange} required />
        <input type="datetime-local" name="endDate" onChange={handleInputChange} required />
        <input type="number" name="percentDiscount" placeholder="Percent Discount" onChange={handleInputChange} required />
        <input type="number" name="maxDiscount" placeholder="Max Discount" onChange={handleInputChange} required />
        <input type="number" name="minPrice" placeholder="Min Price" onChange={handleInputChange} required />
        <input type="number" name="minDiscount" placeholder="Min Discount" onChange={handleInputChange} required />
        
        <div className="button-group">
          <button type="submit" className="submit-button">Add Coupon</button>
          <button onClick={() => navigate('/Coupon-page')} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddCoupon;
