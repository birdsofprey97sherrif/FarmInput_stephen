import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser) {
      setGreeting(getGreeting());
    }
  }, []);

  return (
    <section className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
          <div className="container-fluid">
            <NavLink className="navbar-brand fw-bold text-info" to="/">
              Alpha AgriGear
            </NavLink>

            {user && (
              <div className="w-100 d-flex justify-content-between align-items-center greeting-container px-3">
                {/* Left side: Logged in as */}
                <div className="username-message animate-grow">
                  Logged in as <strong>{user?.username}</strong>
                </div>

                {/* Right side: Greeting message */}
                <div className="greeting-message animate-scroll">
                  {greeting}, {user?.username}!
                </div>
              </div>
            )}
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
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link active text-primary" : "nav-link"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                {!user ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/signup">
                        Signup
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link text-center" to="/uploadFarmInput">
                        <i className="fas fa-upload d-block"></i>
                        <span className="fw-bold">Upload</span>
                        <br />
                        <span className="small">Product</span>
                      </NavLink>
                    </li>
                    {user?.role === "admin" && (
                      <li className="nav-item">
                        <NavLink className="nav-link admin" to="/admin-dashboard">
                          Admin Dashboard
                        </NavLink>
                      </li>
                    )}
                    <li className="nav-item dropdown">
                      <button
                        className="nav-link dropdown-toggle btn btn-link"
                        id="userDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Account
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="userDropdown">
                        <li>
                          <NavLink className="dropdown-item" to="/updateprofile">
                            Update Profile
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="/resetpassword">
                            Reset Password
                          </NavLink>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => {
                              // Clear all user-related data
                              localStorage.clear();
                              sessionStorage.clear();

                              // Navigate to the login page
                              navigate("/login");

                              // Optionally reload the page to ensure a clean state
                              window.location.reload();
                            }}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
