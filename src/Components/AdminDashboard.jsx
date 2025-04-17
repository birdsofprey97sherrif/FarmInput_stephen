import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";

// Reusable Table component to display data
const Table = ({ data, columns, onDelete, type }) => (
    <table>
        <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                ))}
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <tr key={item.id || index}>
                        {columns.map((col) => (
                            <td key={col.key}>{item[col.key]}</td>
                        ))}
                        <td>
                            <button
                                className="btn btn-danger"
                                title={`Delete this ${type}`}
                                onClick={() => onDelete(item.FarmInput_id || item.user_id, type)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length + 1}>No data found.</td>
                </tr>
            )}
        </tbody>
    </table>
);

const AdminDashboard = () => {
    const [FarmInputs, setFarmInputs] = useState([]);
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    let decryptedToken = null;
    try {
        decryptedToken = token ? CryptoJS.AES.decrypt(token, "your-secret-key").toString(CryptoJS.enc.Utf8) : null;
    } catch (error) {
        console.error("Token decryption failed:", error);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {
        if (!user || !decryptedToken || user.role !== "admin") {
            alert("Access denied. Admins only.");
            navigate("/login");
        }
    }, [user, decryptedToken, navigate]);

    const fetchAdminData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get("https://Steviewonder.pythonanywhere.com/admin-dashboard", {
                headers: { Authorization: decryptedToken },
            });

            if (response.data.status === "success") {
                setFarmInputs(response.data.FarmInputs || []);
                setusers(response.data.users || []);
            } else {
                alert(response.data.message || "Failed to fetch admin data.");
            }
        } catch (error) {
            console.error("Error fetching admin data:", error);
        } finally {
            setLoading(false);
        }
    }, [decryptedToken]);

    useEffect(() => {
        fetchAdminData();
    }, [fetchAdminData]);

    const handleDelete = async (id, type) => {
       

        const endpoint =
            type === "FarmInput"
                ? `https://Steviewonder.pythonanywhere.com/delete_FarmInput/${id}`
                : `https://Steviewonder.pythonanywhere.com/delete_user/${id}`;

        try {
            const response = await axios.delete(endpoint, {
                headers: { Authorization: decryptedToken },
            });

            console.log("API Response:", response.data); // Debugging log

            if (response.data.status === "success") {
                alert(response.data.message || `${type} deleted successfully.`);

                // Update the state to remove the deleted item
                if (type === "FarmInput") {
                    setFarmInputs((prevFarmInputs) =>
                        prevFarmInputs.filter((item) => item.FarmInput_id !== id)
                    );
                } else if (type === "user") {
                    setusers((prevUsers) =>
                        prevUsers.filter((user) => user.user_id !== id)
                    );
                }
            } else {
                alert(response.data.message || `Failed to delete the ${type}.`);
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error); // Debugging log
            alert(`An error occurred while deleting the ${type}. Please try again.`);
        }
    };

    return (
        <div>
            <h2 className="underline">Welcome to the Admin Dashboard</h2>
            {loading && <div>Loading...</div>}

            <h3>Farm Inputs</h3>
            <Table
                data={FarmInputs}
                columns={[
                    { key: "FarmInput_id", label: "ID" },
                    { key: "FarmInput_name", label: "Name" },
                    { key: "FarmInput_price", label: "Price" },
                    { key: "FarmInput_quantity", label: "Quantity" },
                ]}
                onDelete={handleDelete}
                type="FarmInput"
            />

            <h3>Users</h3>
            <Table
                data={users}
                columns={[
                    { key: "user_id", label: "ID" },
                    { key: "username", label: "Username" },
                    { key: "email", label: "Email" },
                    { key: "role", label: "Role" },
                ]}
                onDelete={handleDelete}
                type="user"
            />
        </div>
    );
};

export default AdminDashboard;
