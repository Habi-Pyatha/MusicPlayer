import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { setClientToken } from "../../spotify";
import Login from "../auth/login";
import Favorites from "../favorites";
import Feed from "../feed";
import Library from "../library";
import Player from "../player";
import Trending from "../trending";
import "./home.css";

export default function Home() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const expirationTime = window.localStorage.getItem("tokenExpiration");

    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      const expiresIn = parseInt(hash.split("&")[2].split("=")[1], 10); // Example: expires_in=3600
      const expiration = Date.now() + expiresIn * 1000; // Current time + expires_in

      window.localStorage.setItem("token", _token);
      window.localStorage.setItem("tokenExpiration", expiration.toString());

      setToken(_token);
      setClientToken(_token);
    } else if (token && expirationTime && Date.now() > parseInt(expirationTime, 10)) {
      // Token expired
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("tokenExpiration");
      setToken(null); // Force redirect to Login
  } else { 
      setToken(token);
      setClientToken(token);
      
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}
