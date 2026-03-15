import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white text-center py-4 rounded-top-4"
      style={{ backgroundColor: '#25283D' }}
    >
      {/* Logo */}
      <div className="d-flex justify-content-center mb-3">
        <img
              src="/images/footer-image.png"
          alt="Chicken Road Logo"
          className="rounded"
          style={{ width: '140px', height: '80px', borderRadius: '15px' }}
        />
      </div>

      {/* Download Button */}
      <a href="#" download>
        <button
          className="btn btn-warning text-black fw-semibold px-4 py-2 rounded text-xs text-sm mb-3"
          style={{ fontSize: '0.875rem' }}
        >
          Download Now
        </button>
      </a>

      {/* Copyright Info */}
      <div className="d-flex align-items-center justify-content-center text-secondary mb-2 small gap-2">
        <img
          src="/images/footer-image.png"
          alt="icon"
          style={{ width: '16px', height: '16px' }}
        />
        <span>Copyright © 2025 ChickenRoad. All rights reserved.</span>
      </div>

      {/* Links */}
      <div className="d-flex justify-content-center gap-4 text-light small">
        <button className="btn btn-link text-light text-decoration-none p-0 hover-opacity">Terms</button>
        <button className="btn btn-link text-light text-decoration-none p-0 hover-opacity">Privacy</button>
        <button className="btn btn-link text-light text-decoration-none p-0 hover-opacity">Contact</button>
      </div>
    </footer>
  );
};

export default Footer;
