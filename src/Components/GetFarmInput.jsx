import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";

const GetFarmInput = () => {
    const [FarmInputs, setFarmInput] = useState([]);
    const [filteredFarmInput, setFilteredFarmInput] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const image_url = "https://steviewonder.pythonanywhere.com/static/images/";

   const [loading, setLoading] = useState(false);

const getFarmInputs = async () => {
    setLoading(true);
    setError("");
    try {
        const response = await axios.get("https://steviewonder.pythonanywhere.com/get_FarmInputs");
        if (Array.isArray(response.data)) {
            setFarmInput(response.data);
        } else if (Array.isArray(response.data.message)) {
            setFarmInput(response.data.message);
        } else {
            setFarmInput([]);
        }
    } catch (error) {
        setError("Failed to fetch farm inputs. Please try again later.");
        console.error("Error fetching farm inputs:", error.response || error.message || error);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        getFarmInputs();
    }, []);

    useEffect(() => {
        if (!FarmInputs) return;
        const filtered = FarmInputs.filter((FarmInput) =>
            FarmInput.FarmInput_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            FarmInput.FarmInput_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            FarmInput.FarmInput_category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFarmInput(filtered);
    }, [searchQuery, FarmInputs]);

    return (
        <div className="get-farm-input-container">
            <Navbar />
            <Carousel />

            <h2 className="section-header">AVAILABLE FARM INPUTS</h2>
            <hr />

            <div className="search-bar-container">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search Farm Inputs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <i className="search-icon fas fa-search"></i>
            </div>
            {!loading && filteredFarmInput.length === 0 && (
              <p className="no-results-message">No farm inputs found for your search.</p>
                )}
            {error && <p className="error-message">{error}</p>}

            <div className="farm-input-grid">
                {filteredFarmInput?.map((FarmInput) => (
                    <div className="farm-input-card" key={FarmInput.id}>
                        <div className="card-header">
                            <h4>{FarmInput.FarmInput_name}</h4>
                        </div>
                        <span className="custom-category">{FarmInput.FarmInput_category}</span>
                        <div className="card-body">
                            <img
                                  src={image_url + FarmInput.FarmInput_image}
                                  alt={FarmInput.FarmInput_name}
                                  className="farm-input-image"
                                />

                            <p className="farm-input-description">
                                {FarmInput.FarmInput_description}
                            </p>
                            <b className="farm-input-price">Ksh {FarmInput.FarmInput_price}</b>
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
            </div>

            <Footer />
        </div>
    );
};

export default GetFarmInput;
