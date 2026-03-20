import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Admin.css"

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);


  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
   


    <header className="sticky-top bg-white shadow-sm z-50">
    <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white border-top border-bottom shadow-sm px-3">
      <div className="container-fluid">
      

        {/* Hamburger toggle */}
        <button
          className="navbar-toggler border-0 bg-light"
          type="button"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon "></span>
        </button>

        <div
  className={`${
  isMobileMenuOpen ? 'd-block' : 'd-none'
} d-lg-flex flex-column flex-lg-row position-absolute position-lg-static top-100 start-0 mt-0 mt-lg-1 bg-dark p-3 p-lg-0 shadow-lg shadow-lg-lg-none w-50 custom-lg-full `}
style={{ zIndex: 9999 , }}

>
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item">
      <Link className="nav-link text-light fw-medium" to="">Admin</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-light fw-medium" to="admin-setting">Payment Setting</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-light fw-medium" to="users">Users</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-light fw-medium" to="recharge-request">RechargeRequest</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-light fw-medium" to="withdraw-request">WithdrawRequest</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-light fw-medium" to="#">About Us</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-light fw-medium" to="approved-recharges">Approved(Recharge)</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link text-light fw-medium" to="approved-withdraws">Approved(Withdraw)</Link>
    </li>
  </ul>
</div>



          {/* Logo */}
        <div className="position-relative ms-3" ref={profileRef}>
        <button
          className="btn btn-ligfht btn-outline-none roundfed-circle text-center"
          onClick={() => setProfileOpen((prev) => !prev)}
          style={{ width: 40, height: 40 }}
        >
          <i className="bi bi-person-circle fs-5 text-light"></i>
        </button>

        {/* Dropdown */}
        {profileOpen && (
          <div
            className="position-absolute bg-white text-dark p-3 mt-2"
            style={{
              right: 0,
              border: '1px solid #ddd',
              borderRadius: '0.5rem',
              minWidth: '200px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 1000,
            }}
          >
            <p className="mb-2 small">📧 user@example.com</p>
            <button className="btn btn-sm btn-danger w-100">Logout</button>
          </div>
        )}
      </div>
      </div>
    </nav>
  </header>
  );
};

export default AdminHeader;
