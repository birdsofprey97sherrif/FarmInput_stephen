import './App.css';
import Navbar from './Components/Navbar'; // Import the Navbar
import Signup from './Components/Signup';
import Login from './Components/Login';
import UploadFarmInput from './Components/UploadFarmInput';
import GetFarmInput from './Components/GetFarmInput';
import Updateprofile from './Components/Updateprofile';
import Resetpassword from './Components/Resetpassword';
import AdminDashboard from './Components/AdminDashboard';
import Makepayment from './Components/Makepayment';
import AdminRoute from './Components/AdminRoute'; // Import the AdminRoute component
import SplashScreen from "./Components/SplashScreen";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data or initializing the app)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the duration as needed (e.g., 3 seconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoading ? (
          <SplashScreen />
        ) : (
          <>
            {/* Navbar is placed here to appear on all pages */}
            <Navbar />
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/uploadFarmInput" element={<UploadFarmInput />} />
              <Route path="/" element={<GetFarmInput />} />
              <Route path="/updateprofile" element={<Updateprofile />} />
              <Route path="/resetpassword" element={<Resetpassword />} />
              <Route path="/makepayment" element={<Makepayment />} />
              {/* Use AdminRoute to protect the AdminDashboard */}
              <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
