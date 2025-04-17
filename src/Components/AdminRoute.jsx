// filepath: /home/user/Documents/stephen/Stephen_sample project/farminputs/src/App.js
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
  const role = user?.role; // Check the user's role

  if (!user) {
    // If no user is logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    // If the user is not an admin, redirect to the home page
    return <Navigate to="/" />;
  }
  return children; // Allow access to the admin dashboard
};

export default AdminRoute;