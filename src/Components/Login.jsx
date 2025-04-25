import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js"; // Library for encrypting sensitive data
import { useLocation } from "react-router-dom";

const Login = () => {
    // State variables for managing form inputs and UI states
    const [email, setEmail] = useState(""); // Stores the user's email
    const [password, setPassword] = useState(""); // Stores the user's password
    const [rememberMe, setRememberMe] = useState(false); // Tracks if "Remember Me" is checked
    const [loading, setLoading] = useState(""); // Tracks the loading state during form submission
    const [error, setError] = useState(""); // Stores error messages
    const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
    const location = useLocation();
    
    // Detect login and show animation
    useEffect(() => {
        if (location.state?.justLoggedIn) {
            const timer = setTimeout(() => {
                // Remove animation after a few seconds
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const navigate = useNavigate(); // React Router's navigation hook

    // Redirect the user if they are already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        if (user) {
            // Redirect based on the user's role
            if (user.role === "admin") {
                navigate("/admin-dashboard", { state: { justLoggedIn: true } });
            } else {
                navigate("/", { state: { justLoggedIn: true } });
            }

        }
    }, [navigate]);

    // Function to handle form submission
    const submit = async (e) => {
        e.preventDefault();

        setLoading("pleasewait...as we log you in");
        setError("");

        try {
            // Step 1: Use FormData to match Flask's request.form
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            // Step 2: Send the form data without setting Content-Type
            const response = await axios.post(
                "https://steviewonder.pythonanywhere.com/login",
                formData // Send as FormData
                // No headers needed; browser sets them automatically
            );

            // Step 3: Handle the response as before
            if (response.data && response.data.status === "success") {
                const { user, token } = response.data;
                const encryptedToken = CryptoJS.AES.encrypt(token, "your-secret-key").toString();

                if (rememberMe) {
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", encryptedToken);
                } else {
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", encryptedToken);
                }

                alert(response.data.message);

                if (user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/");
                }
            } else {
                setError(response.data.message || "Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading("");
        }
    };


    return (
        <div className="row justify-content-center mt-4">
            <div className="col-md-6 card shadow p-4 form-container">
                <h2 className="underline">SIGN IN HERE</h2>
                <hr />
                {/* Show a loading spinner while the form is being submitted */}
                {loading && (
                    <div className="spinner-border text-primary" role="status" aria-live="polite">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                {/* Display error messages */}
                {error && (
                    <div className="alert alert-danger" role="alert" aria-live="assertive">
                        {error}
                    </div>
                )}
                <form onSubmit={submit}>
                    {/* Email input field */}
                    <label htmlFor="email" className="form-label">
                        Enter Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="email"
                        className="form-control mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                        required
                        aria-label="Email Address"
                    />

                    {/* Password input field */}
                    <label htmlFor="password" className="form-label">
                        Input Password
                    </label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"} // Toggle password visibility
                        placeholder="password"
                        className="form-control mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                        required
                        aria-label="Password"
                    />

                    {/* Checkbox to toggle password visibility */}
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="showPassword"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)} // Toggle showPassword state
                        />
                        <label className="form-check-label" htmlFor="showPassword">
                            Show Password
                        </label>
                    </div>

                    {/* Checkbox for "Remember Me" */}
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)} // Toggle rememberMe state
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                            Remember Me
                        </label>
                    </div>

                    {/* Submit button */}
                    <button type="submit" className="btn btn-primary w-50" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Link to the signup page */}
                <p>
                    Don't have an Account? <Link to="/signup">Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
