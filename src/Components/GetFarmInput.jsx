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
        <div className="row">
            {/* Navbar Component */}
            <Navbar />

            {/* Carousel Component */}
            <Carousel />

            {/* Section Title */}
            <h2 className="section-header mt-2">AVAILABLE FARM INPUTS</h2>
            <hr />

            {/* Search Input */}
            <input
                type="text"
                className="form-control shadow-sm p-2"
                placeholder="Search Farm Inputs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />

            {/* Loading and Error Messages */}
            {loading && <p className="text-center text-info">{loading}</p>}
            {error && <p className="text-center text-danger">{error}</p>}

            {/* Display Farm Inputs */}
            {filteredFarmInput?.map((FarmInput) => (
                <div
                    className="col-md-3 justify-content-center card shadow p-2"
                    key={FarmInput.id}
                >
                    {/* Card Header */}
                    <div className="card-header card-shadow p-2 mb-2">
                        <h4>{FarmInput.FarmInput_name}</h4>
                    </div>
                    {/* Farm Input Category */}
                    <span className="custom-category">{FarmInput.FarmInput_category}</span>

                    {/* Image and Details */}
                    <div className="image-container card-body p-2">
                        <img
                            src={image_url + FarmInput.FarmInput_image}
                            alt="FarmInput"
                            className="FarmInput_img"
                        />
                        <p className="text-muted p-2">
                            {FarmInput.FarmInput_description}
                        </p>
                        <br />
                        <b className="text-warning text-center mt-2">Ksh {FarmInput.FarmInput_price}</b>
                        <br />

                        {/* Buy Now Button */}
                        <button
                            onClick={() =>
                                navigate("/makepayment", { state: { FarmInput } })
                            }
                            className="btn btn-success mt-2 w-100"
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
