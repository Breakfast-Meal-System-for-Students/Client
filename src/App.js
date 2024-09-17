import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/index.jsx";
import ManageStaffPage from "./pages/StaffPage/index.jsx";
import CustomerProfilePage from "./pages/CustomerPage/index.jsx";
import OrdersPage from "./pages/OrderPage/index.jsx";
import Sidebar from "./components/SideBar/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import RegisterPage from "./pages/RegisterPage/index.jsx";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./ProtectedRoute.js";
import MainLayout from "./components/MainLayout/index.jsx";

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route element={<MainLayout/>} path="/">
            <Route path="/" element={<ProtectedRoute element={<DashboardPage />} requiredRole={4} />} />
            <Route path="/manage-staff" element={<ProtectedRoute element={<ManageStaffPage />} requiredRole={1} />} />
            <Route path="/customer-profile" element={<ProtectedRoute element={<CustomerProfilePage />} requiredRole={2} />} />
            <Route path="/orders" element={<ProtectedRoute element={<OrdersPage />} requiredRole={3} />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
