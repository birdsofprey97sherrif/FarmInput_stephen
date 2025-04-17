import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    // here we will use the use state hook initialize the state variables that will store the user's input 
    // from the form as empty strings 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // here we will use the use state hooks to initialize the success, error and loading variables
    // as empty strings to hold the response from the server
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    // here we will use the useNavigate hook to navigate the user to the login page after a successful password reset
    // this hook is used to programmatically navigate the user to a different page
    const navigate = useNavigate();

    // here we will create a function that will handle the form submission
    // also prevent the default behavior of the form when the user clicks the update button(reloads the page)
    const submit = async (e) => {
        e.preventDefault();
        // here we set the loading hook variable to show loading message to the user
        setLoading("pleasewait...as we reset your password");

        // Validate form inputs before sending the request
        if (!validateForm()) {
            setLoading("");
            return;
        }

        // here we use try and catch block to try sending a request to the server 
        // and catch any error that may occur during the request process
        try {
            // here we first create an empty object that will hold the user's input from the form 
            // and then we set the object keys to the user's input from the form
            const data = new FormData();  // this function creates an empty object
            // here we set the object keys to the user's input from the form 
            data.append("email", email);
            data.append("password", password);
            data.append("confirmPassword", confirmPassword);
            // here we will use axios to send a post request to the server with the user's input from the form 
            // through the backend API endpoint 
            const response = await axios.post(
                "https://steviewonder.pythonanywhere.com/reset_password",
                data
            );
            // here we will set the success hook variable to the response message from the server 
            // as well as the loading hook variable to an empty string to stop the loading message 
            setLoading("");
            setSuccess(response.data.message);
            // here we will check if the response message is true and then redirect the user to the login page
            if (response.data.message) {
                setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            // now we get to the catch block where we will catch any error that may occur during the request process 
            // and set the error hook variable to the error message from the server 
            // as well as the loading hook variable to an empty string to stop the loading message 
            setLoading("");
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    // Function to validate form inputs
    const validateForm = () => {
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (password.length < 4) {
            setError("Password must be at least 8 characters long.");
            return false;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }
        setError(""); // Clear any previous errors
        return true;
    };

    return (
        <div className="row justify-content-center mt-2">
            <div className="col-md-6 card shadow p-4 card form-container">
                <h2 className="underline">Reset Password</h2>
                <hr />
                {/* here we will call the loading,error and success hook variables to show the user */}
                {loading && <p className="text-success">{loading}</p>}
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="email">Enter your Email</label>
                        <input
                            id="email" 
                            type="email"
                            className="form-control" 
                            placeholder="Enter your email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Enter new password</label>
                        <input 
                            id="password"
                            type="password" 
                            className="form-control"
                            placeholder="New password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                        />
                        <small className="text-muted">Password must be at least 8 characters long.</small>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword">Confirm new password</label>
                        <input 
                            id="confirmPassword"
                            type="password" 
                            className="form-control"
                            placeholder="Confirm new password" 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                        />
                        <small className="text-muted">Ensure passwords match.</small>
                    </div>
                    <button type="submit" className="btn btn-primary w-50" disabled={loading}>
                        {loading ? "Resetting your password..." : "Reset Password"}
                    </button>
                </form>
                <p>
                    Remember your password? <Link to="/login">Login</Link>
                </p>
                <p>
                    Don't have an account? <Link to="/signup">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;