import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";

// Component to fetch and display farm inputs
const GetFarmInput = () => {
    // State to store farm inputs fetched from the server
    const [FarmInputs, setFarmInput] = useState([]);
    const [filteredFarmInput, setFilteredFarmInput] = useState([]); // State for filtered farm inputs
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [loading, setLoading] = useState(""); // State to track loading status
    const [error, setError] = useState(""); // State to store error messages
    const navigate = useNavigate(); // React Router's navigation hook

    // Base URL for images hosted on the server
    const image_url = "https://steviewonder.pythonanywhere.com/static/images/";

    // Function to fetch farm inputs from the server
    const getFarmInputs = async () => {
        setLoading("Please wait... as we fetch your Farm Inputs");
        try {
            const response = await axios.get(
                "https://steviewonder.pythonanywhere.com/get_FarmInputs"
            );
            setLoading(""); // Clear loading message

            // Check if the response contains an array of farm inputs
            if (Array.isArray(response.data)) {
                setFarmInput(response.data);
            } else if (Array.isArray(response.data.message)) {
                setFarmInput(response.data.message);
            } else {
                setFarmInput([]); // Set an empty array if no data is returned
            }
        } catch (error) {
            setLoading(""); // Clear loading message
            setError("Failed to fetch farm inputs. Please try again later."); // Set error message
            console.error("Error fetching farm inputs:", error.response || error.message || error);
        }
    };

    // Fetch farm inputs when the component mounts
    useEffect(() => {
        getFarmInputs();
    }, []);

    // Filter farm inputs based on the search query
    useEffect(() => {
        if (!FarmInputs) return; // Prevent errors if FarmInputs is undefined
        const filtered = FarmInputs.filter((FarmInput) =>
            FarmInput.FarmInput_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            FarmInput.FarmInput_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            FarmInput.FarmInput_category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFarmInput(filtered); // Update filtered farm inputs
    }, [searchQuery, FarmInputs]);

    return (
        <div className="row get-farm-input-container">
            {/* Navbar Component */}
            <Navbar />

            {/* Carousel Component */}
            <Carousel />

            {/* Section Title */}
            <h2 className="section-header mt-2">AVAILABLE FARM INPUTS</h2>
            <hr />

            {/* Search Input */}
            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search Farm Inputs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="search-icon fas fa-search"></i>
            {/* Loading and Error Messages */}
            {loading && <p className="loading-message">{loading}</p>}
            {error && <p className="error-message">{error}</p>}

            {/* Display Farm Inputs */}
            <div className="farm-input-grid">
                {filteredFarmInput?.map((FarmInput) => (
                    <div className="farm-input-card" key={FarmInput.id}>
                        {/* Card Header */}
                        <div className="card-header">
                            <h4>{FarmInput.FarmInput_name}</h4>
                        </div>
                    {/* Farm Input Category */}
                    <span className="custom-category">{FarmInput.FarmInput_category}</span>

                   {/* Image and Details */}
                        <div className="card-body">
                            <img
                                src={image_url + FarmInput.FarmInput_image}
                                alt="FarmInput"
                                className="farm-input-image"
                            />
                            <p className="farm-input-description">
                                {FarmInput.FarmInput_description}
                            </p>
                            <b className="farm-input-price">Ksh {FarmInput.FarmInput_price}</b>

                        {/* Buy Now Button */}
                        <button
                            onClick={() =>
                                navigate("/makepayment", { state: { FarmInput } })
                            }
                            className="buy-now-button"
                        >
                            Purchase NOW
                        </button>
                    </div>
                </div>
            ))}

            {/* Footer Component */}
            <Footer />
        </div>
    );
};

export default GetFarmInput;
