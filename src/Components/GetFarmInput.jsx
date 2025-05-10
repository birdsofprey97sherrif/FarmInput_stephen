import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./Footer";

const GetFarmInput = () => {
    const [farmInputs, setFarmInputs] = useState([]);
    const [filteredFarmInputs, setFilteredFarmInputs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const image_url = "https://steviewonder.pythonanywhere.com/static/images/";

    const getFarmInputs = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("https://steviewonder.pythonanywhere.com/get_FarmInputs");
            if (Array.isArray(response.data)) {
                setFarmInputs(response.data);
            } else if (Array.isArray(response.data.message)) {
                setFarmInputs(response.data.message);
            } else {
                setFarmInputs([]);
            }
        } catch (err) {
            console.error("Error fetching farm inputs:", err.response || err.message || err);
            setError("Failed to fetch farm inputs. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFarmInputs();
    }, []);

    useEffect(() => {
        const filtered = farmInputs.filter((input) =>
            input.FarmInput_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            input.FarmInput_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            input.FarmInput_category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredFarmInputs(filtered);
    }, [searchQuery, farmInputs]);

    return (
        <div className="get-farm-input-container">
            <Navbar />
            <Carousel />

            <h2 className="section-header">AVAILABLE FARM INPUTS</h2>
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

            {loading && <p className="loading-message">Loading farm inputs...</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="farm-input-grid">
                {filteredFarmInputs.map((input) => (
                    <div className="farm-input-card" key={input.id}>
                        <div className="card-header">
                            <h4>{input.FarmInput_name}</h4>
                        </div>
                        <span className="custom-category">{input.FarmInput_category}</span>
                        <div className="card-body">
                            <img
                                src={image_url + input.FarmInput_image}
                                alt={input.FarmInput_name}
                                className="farm-input-image"
                            />
                            <p className="farm-input-description">{input.FarmInput_description}</p>
                            <b className="farm-input-price">Ksh {input.FarmInput_price}</b>
                            <button
                                onClick={() => navigate("/makepayment", { state: { FarmInput: input } })}
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
