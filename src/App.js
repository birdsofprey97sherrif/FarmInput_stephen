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
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;