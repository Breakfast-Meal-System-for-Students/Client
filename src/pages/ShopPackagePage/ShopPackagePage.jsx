import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './ShopPackagePage.scss';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import AuthContext from '../../auth/AuthContext';
import UpdateCoupon from './UpdateCoupon';
import { ApiGetPackages } from '../../services/PackageServices';
import Avatar from '@mui/material/Avatar';
import { GetImagePackage } from '../../utils/StringUtils';
import Button from '@mui/material/Button';

const ShopPackagePage = () => {
  const { user: { token } } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [couponEdit, setCouponEdit] = useState([]);
  const [shopId, setShopId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = (id) => {
    navigate(`/shop/package/payment?packageId=${id}`);
  };

  const handleSetCouponEdit = (coupon) => {
    setCouponEdit(coupon);
    setPopupOpen(true);
  }
  // Fetch shopId from local storage
  useEffect(() => {
    const storedShopId = localStorage.getItem('shopId');
    if (storedShopId) {
      setShopId(storedShopId);
    }
  }, []);
  // Fetch coupons for the shop
  const fetchPackages = async () => {
    const token = localStorage.getItem('token');
    const result = await ApiGetPackages(searchTerm, true, currentPage, 6, token);
    if (result.ok) {
      setPackages(result.body.data.data);
      setTotalPages(Math.ceil(result.body.data.total / 6));
    } else {
      alert(result.message);
    }
  };
  useEffect(() => {
    fetchPackages();
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

  return (
    <div className="coupon-container">
      <h1>SHOP PACKAGES</h1>
      <div className="coupon-box">
        <div className="search-and-add">
          <input
            type="text"
            placeholder="Search Packages"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
        </div>
        <table className="coupon-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {packages.length > 0 ? (
              packages.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className='d-flex justify-content-center'>
                      <Avatar 
                        src={`/${GetImagePackage(row.name)}`} 
                        alt={`${row.name} package`} 
                        variant="rounded" // Optional: 'circle' or 'square' are other options
                        sx={{ width: 100, height: 100 }} // Adjust size as needed
                      />
                    </div>
                  </td>
                  <td>{row.name}</td>
                  <td>{row.duration}</td>
                  <td>{row.price}</td>
                   <td>
                    <Button variant="contained" color="primary" onClick={() => handleBuyNow(row.id)} sx={{
                      borderRadius: '15px',
                      fontSize: '16px',
                      background: 'linear-gradient(135deg, #b4ec51, #429321, #0f9b0f)',
                      boxShadow: '0px 6px 12px rgba(0,0,0,0.1)',
                    }}>Buy Now</Button>
                  </td>
                  <td>{row.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No packages found.</td>
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
        {isPopupOpen && couponEdit &&
            <UpdateCoupon
              coupon={couponEdit}
              onSave={fetchPackages}
              onClose={() => setPopupOpen(false)} 
            />
        }
      </div>
    </div>
  );
};
export default ShopPackagePage;