import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    // here we initialize the variables that will store the user's input from the form as empty strings 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // here we initialize the success,error and loading variables as empty strings to hold the response from the server 
    // and the loading state of the form
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const navigate = useNavigate();

    // here we create a function that will handle the form submission and 
    // prevent the default behavior of the form when the user clicks the submit button(reloads the page)
    const submit = async (e) => {
        e.preventDefault();
        // here we set the loading hook variable to show loading message to the user
        setLoading("pleasewait...as we create your account");

        // here we use try and catch block to try sending a request to the server 
        // and catch any error that may occur during the request process
        try {
            // here we first create an empty object that will hold the user's input from the form 
            // and then we set the object keys to the user's input from the form
            const data = new FormData();  // this function creates an empty object
            // here we set the object keys to the user's input from the form 
            data.append("username", username);
            data.append("email", email);
            data.append("password", password);
            data.append("phone", phone);
            // here we will use axios to send a post request to the server with the user's input from the form 
            // through the backend API endpoint 
            const response = await axios.post(
                "https://steviewonder.pythonanywhere.com/signup",
                data
            );
            // here we will set the success hook variable to the response message from the server 
            // as well as the loading hook variable to an empty string to stop the loading message 
            setLoading("");
            setSuccess(response.data.message);
            // here we will check if the response message is true and then redirect the user to the login page
            if (response.data.message) {
                setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            // now we get to the catch block where we will catch any error that may occur during the request process 
            // and set the error hook variable to the error message from the server 
            // as well as the loading hook variable to an empty string to stop the loading message 
            setLoading("")
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    // Function to handle password input changes
    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // Update the password state with the user's input
    };

    return (
        <div className="row justify-content-center mt-2">
            <div className="col-md-6 card shadow p-4 card form-container">
                <h2 className="underline">SIGN UP HERE</h2>
                <hr />
                {/* here we will call the loading,error and success hook variables to show the user 
                the loading message,error message or success message  */}
                {loading && (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only visually-hidden">Loading...</span>
                </div>
                 )}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                {/* here we will create a form that will take the user's input */}
                <form onSubmit={submit}>
                    <div className="mb-2">
                        <label htmlFor="username" className="form-label">Enter your Username</label>
                        <div className="input-group mb-2">
                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} // Update username state
                                required
                            />
                        </div>
                        <small className="text-muted">Username should be unique.</small>
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Enter your Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            required
                        />
                        <small className="text-muted">Enter a valid email address.</small>
                    </div>
                    <div className="row">
                    <div className="col-md-6 mb-2">
                        <label htmlFor="password" className="form-label">Input Password</label>
                        <div className="input-group mb-2">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"} // Toggle password visibility
                                placeholder="Enter your password"
                                className="form-control"
                                value={password}
                                onChange={handlePasswordChange} // Update password state
                                required
                                data-bs-toggle="tooltip"
                                title="Password should be at least 8 characters long."
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        <small className="text-muted">Password should be 8 characters or more.</small>
                    </div>

                    <div className="col-md-6 mb-2">
                        <label htmlFor="confirmPassword" className="form-label">Confirm your Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className={`form-control ${password === confirmPassword ? "is-valid" : "is-invalid"}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                            required
                        />
                        <div className="invalid-feedback">Passwords do not match.</div>
                        <div className="valid-feedback">Passwords match!</div>
                    </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="phone" className="form-label">Enter your Phone</label>
                        <input
                            id="phone"
                            type="number"
                            placeholder="Enter your phone number"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} // Update phone state
                            required
                        />
                        <small className="text-muted">Enter a valid phone number.</small>
                    </div>

                    <button type="submit" className="btn btn-primary w-50" disabled={loading}>
                        {loading ? "Creating your account..." : "Signup"}
                    </button>
                </form>
                {/* here we will create a link that will redirect the user to the login page  */}
                <p>Already have an Account? <Link to="/login">Login</Link></p>
                <p className="text-muted mt-3">
                    By signing up, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
};

export default Signup;