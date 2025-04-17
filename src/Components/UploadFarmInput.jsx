import React, { useState } from "react";
import axios from "axios";
// here we will create an arrow function for add FarmInputs
const UploadFarmInput = () => {
// here we will define useState hooks that will hold the user's input from the form 
// at first we will set the variables to empty strings 
const [FarmInput_name, setFarmInput_name] = useState("");
const [FarmInput_description, setFarmInput_description] = useState("");
const [FarmInput_price, setFarmInput_price] = useState("");
const [FarmInput_category, setFarmInput_category] = useState("");
const [FarmInput_image, setFarmInput_image] = useState("");
const [FarmInput_quantity, setFarmInput_quantity] = useState("");

// here we will define useState hooks that will hold the response from the server
// at first we will set the variables to empty strings
const [loading, setLoading] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");

// here we will create a function to validate the form inputs
const validateForm = () => {
    if (!FarmInput_name.trim()) {
        setError("FarmInput name is required.");
        return false;
    }
    if (!FarmInput_description.trim()) {
        setError("FarmInput description is required.");
        return false;
    }
    if (FarmInput_price <= 0) {
        setError("FarmInput price must be a positive number.");
        return false;
    }
    if (!FarmInput_category) {
        setError("Please select a FarmInput category.");
        return false;
    }
    if (!FarmInput_image) {
        setError("Please upload an image for the FarmInput.");
        return false;
    }
    if (FarmInput_quantity <= 0) {
        setError("FarmInput quantity must be a positive number.");
        return false;
    }
    setError(""); // Clear any previous errors
    return true;
};

// here we will create a function that will submit the user's input to the server through the backend API endpoint 
// when the user clicks the submit button and also prevent the default behaviour of the form when the user clicks the submit button
const submit = async (e) => {
    e.preventDefault();
    // validate the form inputs before submitting
    if (!validateForm()) {
        return;
    }
    // here we will set the loading hook variable to show the user a loading message 
    setLoading("please wait...as we upload your FarmInput");
    // here we will create a try and catch block to try sending the data and catch any error that may occur during the request process 
    try {
        // here we will create an empty object that will hold the user's input from the form 
        // and set the object keys to the user's input from the form
        const data = new FormData();// this function creates an empty object
        data.append("FarmInput_name", FarmInput_name);
        data.append("FarmInput_description", FarmInput_description);
        data.append("FarmInput_price", FarmInput_price);
        data.append("FarmInput_category", FarmInput_category);
        data.append("FarmInput_image", FarmInput_image);
        data.append("FarmInput_quantity", FarmInput_quantity);
        // here we will use axios to send a post request to the server with the user's input from the form
        // we shall also use await to wait for the response from the server 
        const response = await axios.post(
            "https://steviewonder.pythonanywhere.com/add_FarmInputs",
            data
        );
        // here we will set the loading hook variable to an empty string to stop the loading message
        setLoading("");
        // here we will set the message hook variable to the response message from the server
        if (response.data.message) {
            setFarmInput_name("");
            setFarmInput_description("");
            setFarmInput_price("");
            setFarmInput_category("");
            setFarmInput_image("");
            setFarmInput_quantity("");
            setMessage("FarmInput uploaded successfully!");
        }
    } catch (error) {
        // now we get to the catch block where we will catch any error that may occur during the request process 
        // we will also set the loading hook variable to an empty string to stop the loading message  
        setLoading("");
        // here we will set the error hook variable to the error message from the server
        setError(error.message);
        console.error("Error uploading FarmInput:", error); // Replace with a logging service
    }
}
    return(
        <div className="row justify-content-center mt-4 ">
            <div className="col-md-6 card-shadow p-4 card form-container">
                <h2 className="underline bg-info p-2">
                    Upload your FarmInput here
                </h2>
                <hr />
                {/* here we will call the loading,error and message hook variables to show the user*/}
                {loading && (
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}
                {/* here we will create a form that will take the user's input */}
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="FarmInput_name">FarmInput Name</label>
                            <input
                                id="FarmInput_name"
                                type="text"
                                placeholder="Enter FarmInput name"
                                className="form-control mb-3"
                                value={FarmInput_name}
                                onChange={(e) => setFarmInput_name(e.target.value)}
                                required
                                aria-label="FarmInput Name"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="FarmInput_price">FarmInput Price</label>
                            <input
                                id="FarmInput_price"
                                type="number"
                                placeholder="Enter FarmInput price"
                                className="form-control mb-3"
                                value={FarmInput_price}
                                onChange={(e) => setFarmInput_price(e.target.value)}
                                required
                                aria-label="FarmInput Price"
                            />
                        </div>
                    </div>
                    <label htmlFor="FarmInput_description">FarmInput Description</label>
                    <textarea
                        id="FarmInput_description"
                        placeholder="Describe your FarmInput here"
                        className="form-control mb-3"
                        value={FarmInput_description}
                        onChange={(e) => setFarmInput_description(e.target.value)}
                        required
                    />
                    <div className="row">
                    <div className="col-md-6">
                    <label htmlFor="FarmInput_category">FarmInput Category</label>
                    <select
                        id="FarmInput_category"
                        className="form-control mb-3"
                        value={FarmInput_category}
                        onChange={(e) => setFarmInput_category(e.target.value)}
                        required
                        aria-label="FarmInput Category"
                    >
                        <option value="" disabled>
                            Select FarmInput Category
                        </option>
                        <option value="Seeds and Planting materials">Seeds and Planting materials</option>
                        <option value="Fertilizers and Soil conditioners">Fertilizers and Soil conditioners</option>
                        <option value="Agrochemicals">Agrochemicals</option>
                        <option value="Farm machinery and Equipments">Farm machinery and Equipments</option>
                        <option value="Animal feeds and Supplements">Animal feeds and Supplements</option>
                        <option value="Protective gear and Farm essentials">Protective gear and Farm essentials</option>
                    </select>
                    </div>
                    <div className="col-md-6">
                    <label htmlFor="FarmInput_quantity">FarmInput Quantity</label>
                    <input
                        id="FarmInput_quantity"
                        type="number"
                        placeholder="Enter FarmInput quantity"
                        className="form-control mb-3"
                        value={FarmInput_quantity}
                        onChange={(e) => setFarmInput_quantity(e.target.value)}
                        required
                        aria-label="FarmInput Quantity"
                    />
                    </div>
                    </div>
                    <label htmlFor="FarmInput_image">Upload FarmInput Image</label>
                    <input
                        id="FarmInput_image"
                        type="file"
                        accept="image/*"
                        className="form-control mb-3"
                        onChange={(e) => setFarmInput_image(e.target.files[0])}
                        required
                    />
                    <button className="btn btn-info btn-block" disabled={loading}>
                        {loading ? "Uploading..." : "UPLOAD FarmInput"}
                    </button>
                </form>
            </div>
        </div>
    )
    
}
export default UploadFarmInput;
