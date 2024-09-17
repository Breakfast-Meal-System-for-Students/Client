import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../SideBar/index'; // Assuming you have a Sidebar component

function MainLayout({children}) {
  const location = useLocation();

  // Hide sidebar on specific routes like /login
  const hideSidebar = location.pathname === '/login';

  return (
    <div style={{ display: 'flex' }}>
      {!hideSidebar && <Sidebar />}
      <div style={{ padding: "20px", width: "100%" }}>
      <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
