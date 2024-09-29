import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeStaff from "./components/HomeStaff";
import Setting from "./components/Setting";
import Account from "./components/Account";
import CRUDCategory from "./components/CRUDCategory";
import Feedback from "./components/Feedback";
import Sidebar from "./components/Sidebar";
import SendFeedbackPage from "./components/SendFeedbackPage";
import ShopDetails from "./components/ShopDetails";
import EditCategory from "./components/EditCategory";
import AddCategory from "./components/AddCategory";
import ShopApplication from "./components/ShopApplication";
import DetailApplication from "./components/DetailApplication";
import DashboardPage from "./pages/DashboardPage/index.jsx";
import ManageStaffPage from "./pages/StaffPage/index.jsx";
import CustomerDetails from "./pages/CustomerPage/index.jsx";
import OrdersPage from "./pages/OrderPage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./ProtectedRoute.js";
import MainLayout from "./components/MainLayout/index.jsx";
import AdminPage from "./pages/StaffPage/index.jsx";
import ShopPage from "./pages/ShopPage/index.jsx";
import ProfilePage from "./pages/ProfilePage/index.jsx";
import FeedbackPage from "./pages/FeedbackPage/FeedbackPage.jsx";
import Menu from  "./pages/MenuPage/MenuPage.jsx";
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
              path="/"
              element={<ProtectedRoute element={<DashboardPage />} requiredRole={"Admin"} />}
            />
            <Route
              path="/manage-staff"
              element={<ProtectedRoute element={<ManageStaffPage />} requiredRole={"Admin"} />}
            />
            <Route
              path="/customer-profile"
              element={<ProtectedRoute element={<CustomerDetails />} requiredRole={"Admin"} />}
            />
            <Route
              path="/orders"
              element={<ProtectedRoute element={<OrdersPage />} requiredRole={"Admin"} />}
            />
            <Route
              path="/admin"
            />
            <Route
              path="/profile" 
              element={<ProtectedRoute element={<ProfilePage />} requiredRole={"Admin"} />}
            />
          </Route>

          {/* Shop Routes */}
          <Route element={<MainLayout />} path="/">
            <Route
              path="/ShopPage"
              element={<ProtectedRoute element={<ShopPage />} requiredRole={"Shop"} />}
            />
            <Route
              path="/Feedback"
              element={<ProtectedRoute element={<FeedbackPage />} requiredRole={"Shop"} />}
            />
            <Route
              path="/profile" 
              element={<ProtectedRoute element={<ProfilePage />} requiredRole={"Shop"} />}
            />
            <Route
              path="/Menu" 
              element={<ProtectedRoute element={<ProfilePage />} requiredRole={"Shop"} />}
            />
          </Route>
            

          {/* Staff Routes */}
          <Route element={<MainLayout />}>
            <Route path="/home-staff" element={<HomeStaff />} />
            <Route element={<ProtectedRoute requiredRole={"Staff"} />}>
              <Route path="/setting" element={<Setting />} />
              <Route path="/account" element={<Account />} />
              <Route path="/crud-category" element={<CRUDCategory />} />
              <Route path="/edit-category/:id" element={<EditCategory />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/send-feedback" element={<SendFeedbackPage />} />
              <Route path="/shop-application" element={<ShopApplication />} />
            </Route>
          </Route>

          {/* Shop Routes */}


          {/* General Routes */}
          <Route path="/detail-application/:id" element={<DetailApplication />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
