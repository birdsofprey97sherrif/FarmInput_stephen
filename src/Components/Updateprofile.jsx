import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProfile = () => {
    // here we will use the use state hook initialize the state variables that will store the user's input 
    // from the form as empty strings 
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setphone] = useState("");
    // here we will use the use state hooks to initialize the success, error and loading variables 
    // as empty strings to hold the response from the server 
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const navigate = useNavigate();

    // here we will create a function that will handle the form submission 
    // also prevent the default behavior of the form when the user clicks the update button(reloads the page) 
    const submit = async (e) => {
        e.preventDefault();
        // here we set the loading hook variable to show loading message to the user
        setLoading("pleasewait...as we update your profile");

        // here we use try and catch block to try sending a request to the server 
        // and catch any error that may occur during the request process
        try {
            // Validate form inputs before sending the request
            if (!validateForm()) {
                setLoading("");
                return;
            }

            // here we first create an empty object that will hold the user's input from the form 
            // and then we set the object keys to the user's input from the form
            const data = new FormData();  // this function creates an empty object
            // here we set the object keys to the user's input from the form 
            data.append("username", username);
            data.append("email", email);
            data.append("phone", phone);
            // here we will use axios to send a post request to the server with the user's input from the form 
            // through the backend API endpoint 
            const response = await axios.post(
                "https://steviewonder.pythonanywhere.com/update_profile",
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
        if (!username.trim()) {
            setError("Username is required.");
            return false;
        }
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (!/^254\d{9}$/.test(phone)) {
            setError("Phone number must start with 254 and be 12 digits long.");
            return false;
        }
        setError(""); // Clear any previous errors
        return true;
    };

    return (
        <div className="row justify-content-center mt-2">
            <div className="col-md-6 card shadow p-4 card form-container">
                <h2 className="underline">Update Profile</h2>
                <hr />
                {/* here we will call the loading,error and success hook variables to show the user */}
                {loading && <div className="alert alert-info">{loading}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                {/* here we will create a form that will take the user's input and call the submit function when the user clicks the update button */}
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="username">Enter Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="form-control" 
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Update username state
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Enter your new Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control" 
                            placeholder="Enter your new email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Enter your new phone number:</label>
                        <input
                            type="number"
                            id="phone"
                            className="form-control"
                            placeholder="Enter your new phone"
                            value={phone}
                            onChange={(e) => setphone(e.target.value)} // Update phone state
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-50 mt-4" disabled={loading}>
                        {loading ? "Updating your profile..." : "Update profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;