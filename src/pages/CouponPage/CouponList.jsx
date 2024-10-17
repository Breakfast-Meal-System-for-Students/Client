import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './CouponPage.scss';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const CouponList = () => {
  const { token } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [shopId, setShopId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  // Decode the token to extract shopId
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setShopId(decodedToken.shopId);
    }
  }, [token]);

  // Fetch coupons for the shop based on shopId and search term
  const fetchCoupons = async () => {
    if (shopId) {
      try {
        const response = await axios.get('https://bms-fs-api.azurewebsites.net/api/Coupon/get-all-coupon-for-shop', {
          params: {
            shopId: shopId,
            search: searchTerm,
            isDesc: true,
            pageIndex: currentPage,
            pageSize: 6,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        // Log the entire response data for inspection
        console.log('API Response:', response); // Log the full response object
        console.log('Coupons Data:', response.data.items); // Log the coupons specifically
        console.log('Total Pages:', response.data.totalPages); // Log total pages
  
        setCoupons(response.data.items); // Update with coupon items
        setTotalPages(response.data.totalPages); // Update total pages
      } catch (error) {
        console.error('Failed to fetch coupons', error);
      }
    }
  };
  

  useEffect(() => {
    fetchCoupons();
  }, [shopId, currentPage, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="coupon-container">
      <h1>Shop Coupons</h1>

      <div className="coupon-box">
        <div className="coupon-header">
          <input 
            type="text" 
            placeholder="Search Coupons" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            className="search-bar" 
          />
          <button onClick={() => navigate('/add-Coupon')} className="add-coupon-button">Add Coupon</button>
        </div>

        <div className="coupon-list">
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <div key={coupon.id} className="coupon-card">
                <h2>{coupon.name}</h2>
                <p>Start Date: {new Date(coupon.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(coupon.endDate).toLocaleDateString()}</p>
                <p>Discount: {coupon.percentDiscount}%</p>
                <p>Max Discount: ${coupon.maxDiscount}</p>
                <p>Min Price: ${coupon.minPrice}</p>
                <p>Min Discount: ${coupon.minDiscount}</p>
              </div>
            ))
          ) : (
            <p>No coupons found.</p> // Message when there are no coupons
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1 || totalPages === 0} // Disable if on first page or no coupons
            className={currentPage === 1 || totalPages === 0 ? 'disabled' : ''}
          >
            Previous
          </button>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages || totalPages === 0} // Disable if on last page or no coupons
            className={currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}
          >
            Next
          </button>
        </div>

        <span>Page {currentPage} of {totalPages > 0 ? totalPages : 1}</span>
      </div>
    </div>
  );
};

export default CouponList;
