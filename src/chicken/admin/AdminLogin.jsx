// src/Pages/Admin/AdminLogin.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post(`${apiUrl}/user/admin-login`, formData);
      const { token } = res.data;

      localStorage.setItem('admin_token', token); // Store admin token
      localStorage.setItem('role', 'admin');
      setSuccess('Login successful!');
      window.location.href = '/admin'; // Redirect to admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };



    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("admin_token");
      const role = localStorage.getItem("role");
      const isAdmin = token && role === "admin";
  
  
      console.log("isAdmin:", isAdmin);
  
      if (!isAdmin) {
        navigate("/admin/login", { replace: true });
      }else {
        // If already logged in as admin, redirect to admin dashboard
        navigate("/admin", { replace: true });
      }

    }, [navigate]);
  

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
  <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
    <div className="text-center mb-4">
      <img
        src="/images/admin-icon.png"
        alt="Admin"
        width="60"
        className="mb-2"
      />
      <h3 className="fw-bold">Admin Login</h3>
      <p className="text-muted small">Access your dashboard securely</p>
    </div>

    {error && <div className="alert alert-danger">{error}</div>}
    {success && <div className="alert alert-success">{success}</div>}

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <div className="input-group">
          <span className="input-group-text bg-white"><i className="bi bi-envelope-fill"></i></span>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="admin@example.com"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <div className="input-group">
          <span className="input-group-text bg-white"><i className="bi bi-telephone-fill"></i></span>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            required
            placeholder="9876543210"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">Password</label>
        <div className="input-group">
          <span className="input-group-text bg-white"><i className="bi bi-lock-fill"></i></span>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>
      </div>

      <button className="btn btn-primary w-100 fw-bold" type="submit">
        <i className="bi bi-box-arrow-in-right me-2"></i>Login
      </button>
    </form>
  </div>
</div>

  );
};

export default AdminLogin;
