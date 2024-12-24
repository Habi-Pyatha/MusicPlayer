import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Favorites from "../favorites";
import Library from "../library";
import Trending from "../trending";
import Feed from "../feed";
import Player from "../player";
import "./home.css";
import Sidebar from "../../components/sidebar";
import Login from "../auth/login";
import { setClientToken } from "../../spotify";
function Home() {
  const [token, setToken ] = useState("");
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash= "";
    if(!token && hash) {

        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
        setClientToken(_token);
    }else{
        setToken(token);
        setClientToken(token);

    }

    // if (localStorage.getItem("token")) {
    //     setToken(localStorage.getItem("token"));
    // }
  }, []);

  return !token ?(
    <Login /> ) :
    (

    <Router>
      <div className="main-body">
        
        < Sidebar/>
        <Routes>
                <Route path="/" element={<Library/>} />
                <Route path="/feed" element={<Feed/>} />
                <Route path="/trending" element={<Trending/>} />
                <Route path="/player" element={<Player/>} />
                <Route path="/favorites" element={<Favorites/>} />
                <Route path="/library" element={<Library/>} />
            </Routes>
      </div>
    </Router>
  );
}

export default Home;



