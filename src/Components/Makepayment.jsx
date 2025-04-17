import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Makepayment = () => {
  // Extract FarmInput data from the state passed via useLocation
  const { FarmInput } = useLocation().state || {};

  // State to store the user's phone number
  const [phone, setPhone] = useState('');

  // State to store messages (e.g., success or error messages)
  const [message, setMessage] = useState('');

  // State to track the loading status during payment processing
  const [loading, setLoading] = useState(false);

  // Function to validate the phone number format
  // Ensures the phone number starts with "254" and is followed by 9 digits
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^254\d{9}$/; // Regex for Kenyan phone numbers
    return phoneRegex.test(phone);
  };

  // Function to handle form submission and process the payment
  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate the phone number before proceeding
    if (!validatePhoneNumber(phone)) {
      setMessage("Invalid phone number. Please enter a valid number starting with 254.");
      return;
    }

    // Set loading state and display a processing message
    setLoading(true);
    setMessage('Please wait.... as we process your payment');

    try {
      // Prepare the data to be sent to the payment API
      const data = new FormData();
      data.append("phone", phone); // Add phone number
      data.append("amount", FarmInput.FarmInput_price); // Add payment amount

      // Send a POST request to the payment API
      const response = await axios.post(
        "https://GithinjiStephen.pythonanywhere.com/api/mpesa_payment",
        data
      );

      // Display the success message from the API response
      setMessage(response.data.message);
    } catch (error) {
      // Handle errors and display a failure message
      setMessage("Payment failed. Please try again.");
      console.error("Error processing payment:", error);
    } finally {
      // Reset the loading state after the request is complete
      setLoading(false);
    }
  };

  // If FarmInput data is not available, display an error message
  if (!FarmInput) {
    return <p className="text-danger">No FarmInput data available. Please go back and try again.</p>;
  }

  return (
    <div className="container mt-5">
      {/* Navigation link to go back to the list of FarmInputs */}
      <nav>
        <Link to="/" className="btn btn-primary mb-3">GET ALL FarmInputs</Link>
      </nav>

      {/* Card to display payment details */}
      <div className="card shadow p-4">
        <h2 className="underline text-center text-primary">Make Payment - Lipa na Mpesa</h2>

        {/* Display FarmInput details */}
        <div className="mt-4">
          <p><strong>FarmInput Name:</strong> {FarmInput.FarmInput_name}</p>
          <p><strong>FarmInput Cost:</strong> {FarmInput.FarmInput_price}</p>
          <p><strong>FarmInput Description:</strong> {FarmInput.FarmInput_description.substring(0, 15)}...</p>
          <p><strong>FarmInput Quantity:</strong> {FarmInput.FarmInput_quantity}</p>
          <p><strong>FarmInput Category:</strong> {FarmInput.FarmInput_category}</p>
        </div>

        {/* Payment form */}
        <form onSubmit={submit} className="mt-4">
          {/* Display message (success, error, or loading) */}
          {message && <p className="text-info">{message}</p>}

          {/* Input field for phone number */}
          <div className="row justify-content-center">
            <div className="col-md-6 card shadow p-3 form-container">
              <label htmlFor="phone">Enter your phone number</label>
              <input
                id="phone"
                type="text"
                className="form-control"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} // Update phone state on input change
              />
              <small className="text-muted">Enter a valid phone number starting with 254.</small>
            </div>
          </div>

          {/* Submit button */}
          <br />
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Processing..." : "Make Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Makepayment;