import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser); // Set user data from localStorage
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  return (
    <section className="row">
      <div className="col-md-12">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              Alpha Agro Stores
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
              <ul className="navbar-nav ms-auto">
                {/* Home Link */}
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
                    {/* Links for unauthenticated users */}
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
                    {/* Links for authenticated users */}
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/uploadFarmInput">
                        <i className="fas fa-upload"></i> Upload Farm Input
                      </NavLink>
                    </li>
                    {user && user.role === "admin" && (
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
                              localStorage.removeItem("user");
                              navigate("/login");
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