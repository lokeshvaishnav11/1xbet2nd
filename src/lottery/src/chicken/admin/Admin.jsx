import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Admin = () => {
  const [number, setNumber] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/user/send-num`, {
        number: Number(number)
      });
      console.log('Response:', res.data);
      alert('Number sent successfully!');
    } catch (error) {
      console.error('Error sending number:', error);
      alert('Failed to send number');
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
    }
  }, [navigate]);




 


  return (

    <div className='bg-light'>
    
    
    
    <div className="container d-flex justify-content-center align-items-center min-vh-100 ">

    
      <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%', borderRadius: '12px' }}>
        <h4 className="text-center fw-bold mb-3 text-primary">
          Submit Crash Value
        </h4>
        <p className="text-center text-muted small mb-4">
          Enter a number below to send it to the crash prediction API.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="numInput" className="form-label fw-semibold">Crash Value</label>
            <input
              type="number"
              id="numInput"
              className="form-control"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Type a number (e.g. 5, 10.5)"
              required />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            <i className="bi bi-send-fill me-2"></i>Send to API
          </button>
        </form>
      </div>


    </div></div>

  );
};

export default Admin;
