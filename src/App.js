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
import CustomerProfilePage from "./pages/CustomerPage/index.jsx";
import OrdersPage from "./pages/OrderPage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./ProtectedRoute.js";
import MainLayout from "./components/MainLayout/index.jsx";
import AdminPage from "./pages/StaffPage/index.jsx";
import ShopPage from "./pages/ShopPage/index.jsx";
import ProfilePage from "./pages/ProfilePage/index.jsx"; // <-- Import ProfilePage here

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin Routes */}
          <Route element={<MainLayout />} path="/">
            <Route path="/" element={<ProtectedRoute element={<DashboardPage />} requiredRole={4} />} />
            <Route path="/manage-staff" element={<ProtectedRoute element={<ManageStaffPage />} requiredRole={4} />} />
            <Route path="/customer-profile" element={<ProtectedRoute element={<CustomerProfilePage />} requiredRole={4} />} />
            <Route path="/orders" element={<ProtectedRoute element={<OrdersPage />} requiredRole={4} />} />
            <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} requiredRole={4} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} requiredRole={4} />} /> {/* Ensure route for admin */}
          </Route>

          {/* Staff Routes */}
          <Route path="/home-staff" element={<HomeStaff />} />
          <Route element={<ProtectedRoute requiredRole={2} />}>
            <Route path="/setting" element={<ProtectedRoute element={<Setting />} requiredRole={2} />} />
            <Route path="/account" element={<ProtectedRoute element={<Account />} requiredRole={2} />} />
            <Route path="/crud-category" element={<ProtectedRoute element={<CRUDCategory />} requiredRole={2} />} />
            <Route path="/edit-category/:id" element={<ProtectedRoute element={<EditCategory />} requiredRole={2} />} />
            <Route path="/add-category" element={<ProtectedRoute element={<AddCategory />} requiredRole={2} />} />
            <Route path="/feedback" element={<ProtectedRoute element={<Feedback />} requiredRole={2} />} />
            <Route path="/send-feedback" element={<ProtectedRoute element={<SendFeedbackPage />} requiredRole={2} />} />
            <Route path="/shop-application" element={<ProtectedRoute element={<ShopApplication />} requiredRole={2} />} />
          </Route>

          {/* Shop Routes */}
          <Route element={<ShopPage />} path="/shop-home-page"></Route>

          {/* Other routes that may not require protection */}
          <Route path="/detail-application/:id" element={<DetailApplication />} />
          <Route path="/shop/:id" element={<ShopDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
