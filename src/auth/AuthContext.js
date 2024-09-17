import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch("https://bms-fs-api.azurewebsites.net/api/Auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // Lấy dữ liệu từ phản hồi
    if (data.isSuccess) {
      localStorage.setItem('token', data.data.token); // Lưu token vào localStorage
      const decoded = jwtDecode(data.data.token);
      setUser(decoded); // Cập nhật user
      return data.data.roles[0]; // Trả về vai trò đầu tiên
    } else {
      throw new Error(data.messages[0]?.content || 'Login failed'); // Xử lý lỗi
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
