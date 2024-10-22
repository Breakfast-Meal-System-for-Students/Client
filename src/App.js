import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeStaff from "./pages/HomeStaff/HomeStaff.js";
import Setting from "./pages/Setting/Setting.js";
import Category from "./pages/Category/Category.js";
import Feedback from "./pages/Feedback/Feedback.js";
import SendFeedbackPage from "./pages/Feedback/SendFeedbackPage.js";
import ShopDetails from "./pages/ShopDetails/ShopDetails.js";
import EditCategory from "./pages/Category/EditCategory.js";
import AddCategory from "./pages/Category/AddCategory.js";
import ShopApplication from "./pages/ShopApplication/ShopApplication.js";
import DetailApplication from "./pages/DetailApplication/DetailApplication.js";
import DashboardPage from "./pages/DashboardPage/index.jsx";
import OrdersPage from "./pages/OrderPage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./ProtectedRoute.js";
import MainLayout from "./components/MainLayout/index.jsx";
import ShopPage from "./pages/ShopPage/index.jsx"; // Sửa tên chính xác
import ProfilePage from "./pages/ProfilePage/index.jsx";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage.jsx";
import CouponPage from  "./pages/CouponPage/CouponPage.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import StaffPage from "./pages/StaffPage/StaffPage.jsx";
import AddProduct from "./pages/ProductPage/AddProduct"; // Import AddProduct
import UserDetails from "./pages/CustomerPage/UserDetails.jsx";
import AddCoupon from "./pages/CouponPage/AddCoupon.jsx";
import FeedBackShop from './pages/FeedbackPage/FeedbackShop.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes */}
          <Route element={<MainLayout />} path="/">
            <Route
              path="/admin"
              element={<ProtectedRoute element={<DashboardPage />} requiredRole={"Admin"} />}
            />
            <Route
              path="/manage-staff"
              element={<ProtectedRoute element={<StaffPage />} requiredRole={"Admin"} />}
            />
            <Route
              path="/customer-details"
              element={<ProtectedRoute element={<UserDetails />} requiredRole={"Admin"} />}
            />
            <Route
              path="/orders"
              element={<ProtectedRoute element={<OrdersPage />} requiredRole={"Admin"} />}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} requiredRole={"Admin"} />}
            />
            <Route
              path="/feedback-admin"
              element={<ProtectedRoute element={<FeedbackPage />} requiredRole={"Admin"} />}
            />
          </Route>

          {/* Shop Routes */}
          <Route element={<MainLayout />} path="/">
            <Route
              path="/shop"
              element={<ProtectedRoute element={<ShopPage />} requiredRole={"Shop"} />}
            />
            <Route
              path="/feedback-shop"
              element={<ProtectedRoute element={<FeedBackShop />} requiredRole={"Shop"} />}
            />
            <Route
              path="/Coupon-page"
              element={<ProtectedRoute element={<CouponPage />} requiredRole={"Shop"} />}
            />
            <Route
              path="/add-Coupon"
              element={<ProtectedRoute element={<AddCoupon />} requiredRole={"Shop"} />}
            />

            <Route
              path="/profile"
              element={<ProtectedRoute element={<ProfilePage />} requiredRole={"Shop"} />}
            />
            <Route
              path="/menu"
              element={<ProtectedRoute element={<ProductPage />} requiredRole={"Shop"} />}
            />
            <Route
              path="/add-product"
              element={<ProtectedRoute element={<AddProduct />} requiredRole={"Shop"} />} // Add route for AddProduct
            />
          </Route>

          {/* Staff Routes */}
          <Route element={<MainLayout />} path= "/">
            <Route
              path="/home-staff"
              element={<ProtectedRoute element={<HomeStaff />} requiredRole={"Staff"} />}
            />
            <Route
              path="/category"
              element={<ProtectedRoute element={<Category />} requiredRole={"Staff"} />}
            />
            <Route
              path="/feedback"
              element={<ProtectedRoute element={<Feedback />} requiredRole={"Staff"} />}
            />
            <Route
              path="/send-feedback"
              element={<ProtectedRoute element={<SendFeedbackPage />} requiredRole={"Staff"} />}
            />
            <Route
              path="/shop-details"
              element={<ProtectedRoute element={<ShopDetails />} requiredRole={"Staff"} />}
            />
            <Route
              path="/edit-category/:id"
              element={<ProtectedRoute element={<EditCategory />} requiredRole={"Staff"} />}
            />
            <Route
              path="/add-category"
              element={<ProtectedRoute element={<AddCategory />} requiredRole={"Staff"} />}
            />
            <Route
              path="/shop-application"
              element={<ProtectedRoute element={<ShopApplication />} requiredRole={"Staff"} />}
            />
            <Route
              path="/detail-application/:id"
              element={<ProtectedRoute element={<DetailApplication />} requiredRole={"Staff"} />}
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
