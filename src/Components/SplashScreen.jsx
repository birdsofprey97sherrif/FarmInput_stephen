// components/SplashScreen.jsx
import React from "react";// Add custom styles for the splash screen

const SplashScreen = () => {
  return (
    <div className="splash-screen flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="splash-content text-center animate-fadeIn">
        <img
          src="public/logo1.png" // Replace with your logo path
          alt="App Logo"
          className="splash-logo w-32 h-32 mx-auto mb-6"
        />
        <h1 className="splash-title text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg animate-pulse">
          Welcome to Alpha Agro Stores
        </h1>
        <p className="splash-subtitle mt-4 text-xl text-white opacity-80">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
