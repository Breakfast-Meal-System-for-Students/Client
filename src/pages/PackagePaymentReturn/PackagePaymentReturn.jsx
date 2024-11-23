import React, { useState, useEffect, useContext } from 'react';
import './PackagePaymentReturn.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { ApiBuyPackage } from '../../services/PackageServices';
const PackagePaymentReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const packageId = searchParams.get('packageId');
  const paymentStatus = searchParams.get('paymentStatus');
  useEffect(()=>{
    const fetchApiBuyPayement = async () => {
      if (!packageId || !paymentStatus) {
        navigate('/shop')
      }
      if  (paymentStatus == "SUCCESS") {
        const shopId = localStorage.getItem('shopId');
        const token = localStorage.getItem('token');
        setIsSuccess(true);
        const result = await ApiBuyPackage(shopId, packageId, token);
        if (result.ok) {
          setTimeout(() => {
            navigate(`/shop/package`);
          }, 3000); // Điều hướng sau 3 giây
        } else {
          alert(result.message);
        }
      } else {
        setIsSuccess(false);
      }
    }
    fetchApiBuyPayement();
  }, [packageId, paymentStatus]);
  return (
    <div className="coupon-container">
      <div className='d-flex justify-content-center'>
        <div className='text-center'>
          {isSuccess && (
            <div>
              <h1 className='fw-bold'>PAYMENT <span className='text-success'>SUCCESSFUL</span></h1>
              <img src='/Loading_icon.gif' alt='loading' className="thumbnail my-2" style={{ width: 150, height: 'auto', border: 'none' }} />
              <p className='text-secondary'>You will be redirected to the homepage in a few seconds...</p>
            </div>
          ) || (
              <div className='fw-bold'>
                <h1>PAYMENT <span className='text-danger'>FAILED</span></h1>
                <img src='/Loading_icon.gif' alt='loading' className="thumbnail my-2" style={{ width: 150, height: 'auto', border: 'none' }} />
                <p className='text-secondary'>An error occurred during the payment process.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default PackagePaymentReturn;