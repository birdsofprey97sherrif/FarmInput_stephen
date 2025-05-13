import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good morning";
    if (hour < 18) return "☀️ Good afternoon";
    return "🌙 Good evening";
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    if (storedUser) {
      setGreeting(getGreeting());
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src="/logo.png" alt="Logo" height="40" className="me-2" />
          <span className="fw-bold text-info fs-4">Alpha AgriGear</span>
        </NavLink>

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
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active text-primary" : "nav-link"
                }
                to="/"
              >
                <i className="fas fa-home me-1"></i> Home
              </NavLink>
            </li>

            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    <i className="fas fa-user-plus me-1"></i> Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-1"></i> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-2">
                  <NavLink className="btn btn-outline-success" to="/uploadFarmInput">
                    <i className="fas fa-upload me-1"></i> Upload Product
                  </NavLink>
                </li>

                {user?.role === "admin" && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin-dashboard">
                      <i className="fas fa-tools me-1"></i> Admin
                    </NavLink>
                  </li>
                )}

                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      3
                    </span>
                  </NavLink>
                </li>

                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle d-flex align-items-center btn btn-link"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={user?.avatar || "/default-avatar.png"}
                      alt="avatar"
                      className="rounded-circle me-2"
                      width="32"
                      height="32"
                    />
                    <span className="fw-semibold">{user.username}</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <span className="dropdown-item-text text-muted">
                        {greeting}, {user.username}!
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
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
                      <button className="dropdown-item" onClick={handleLogout}>
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
  );
};

export default Navbar;
