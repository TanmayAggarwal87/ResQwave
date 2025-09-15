import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AuthorityDB from "./pages/AuthorityDB";
import CrowdSourced from "./pages/CrowdSourced";
import SocialMedia from "./pages/SocialMedia";
import LiveMap from "./pages/LiveMap";
import Notice from "./pages/Notice";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authority-dashboard" element={<AuthorityDB />} />
            <Route path="/app-reports" element={<CrowdSourced />} />
            <Route path="/social-media" element={<SocialMedia />} />
            <Route path="/live-map" element={<LiveMap />} />
            <Route path="/notice" element={<Notice />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;