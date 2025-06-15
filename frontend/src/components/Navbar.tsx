// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  // Assuming role 0 is Admin based on your backend response example
  const isAdmin = user ? JSON.parse(user).role === 0 : false;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Job Portal</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/jobs">All Jobs</Link>
            </li>
            {token && ( // Show these links only if logged in
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-job">Add Job</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/prompt-job">Add Job by Prompt</Link>
                </li>
                {isAdmin && ( // Show Admin link only if admin
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                  </li>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {token ? ( // Show Logout if logged in, otherwise Login
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;