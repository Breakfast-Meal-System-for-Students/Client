import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CouponPage.scss';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

const CouponPage = () => {
  const { token } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [shopId, setShopId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch shopId from local storage
  useEffect(() => {
    const storedShopId = localStorage.getItem('shopId');
    if (storedShopId) {
      setShopId(storedShopId);
    }
  }, []);

  // Fetch coupons for the shop
  const fetchCoupons = async () => {
    if (shopId) {
      try {
        const response = await axios.get(
          'https://bms-fs-api.azurewebsites.net/api/Coupon/get-all-coupon-for-shop',
          {
            params: {
              shopId: shopId,
              search: searchTerm,
              isDesc: true,
              pageIndex: currentPage,
              pageSize: 6,
            },
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );

        console.log('API Response:', response.data.data);
        setCoupons(response.data.data.data);
        setTotalPages(Math.ceil(response.data.total / 6));
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
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDeleteCoupon = async (couponId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this coupon?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://bms-fs-api.azurewebsites.net/api/Coupon/${couponId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchCoupons(); // Refresh coupon list after deletion
      } catch (error) {
        console.error('Error deleting coupon:', error);
      }
    }
  };

  return (
    <div className="coupon-container">
      <h1>Shop Coupons</h1>

      <div className="coupon-box">
        <div className="search-and-add">
          <input
            type="text"
            placeholder="Search Coupons"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <button onClick={() => navigate('/add-coupon')} className="add-coupon-button">
            Add Coupon
          </button>
        </div>

        <table className="coupon-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Discount (%)</th>
              <th>Max Discount</th>
              <th>Min Price</th>
              <th>Min Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.name}</td>
                  <td>{new Date(coupon.startDate).toLocaleDateString()}</td>
                  <td>{new Date(coupon.endDate).toLocaleDateString()}</td>
                  <td>{coupon.percentDiscount}%</td>
                  <td>${coupon.maxDiscount}</td>
                  <td>${coupon.minPrice}</td>
                  <td>${coupon.minDiscount}</td>
                  <td className="coupon-actions">
                    <AiOutlineEdit
                      onClick={() => navigate(`/edit-coupon/${coupon.id}`)}
                      className="edit-icon"
                    />
                    <AiOutlineDelete
                      onClick={() => handleDeleteCoupon(coupon.id)}
                      className="delete-icon"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No coupons found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalPages === 0}
            className={currentPage === 1 || totalPages === 0 ? 'disabled' : ''}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages > 0 ? totalPages : 1}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
