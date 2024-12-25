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
  const TOKEN_EXPIRATION_TIME = 3600 * 10000;
  // useEffect(() => {
  //   const token = window.localStorage.getItem("token");
  //   const hash = window.location.hash;
  //   window.location.hash= "";
  //   if(!token && hash) {

  //       const _token = hash.split("&")[0].split("=")[1];
  //       const expirationTime = Date.now() + TOKEN_EXPIRATION_TIME;
  //       window.localStorage.setItem("token", _token);
  //       window.localStorage.setItem("expirationTime", expirationTime);
  //       setToken(_token);
  //       setClientToken(_token);
  //   }else if(token){
  //     const expirationTime = parseInt(window.localStorage.getItem("expirationTime"));
  //     if(Date.now() > expirationTime) {
  //       window.localStorage.removeItem("token");
  //       window.localStorage.removeItem("expirationTime");
  //       setToken(null);
  //       setClientToken(null);
  //       // console.log("Token expired");
       
  //     }else{
  //         setToken(token);
  //         setClientToken(token);
  //     }

  //       // setToken(token);
  //       // setClientToken(token);

  //   }

  //   // if (localStorage.getItem("token")) {
  //   //     setToken(localStorage.getItem("token"));
  //   // }
  // }, []);
  useEffect(() => {
    const savedToken = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
  
    if (!savedToken && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      const expirationTime = Date.now() + TOKEN_EXPIRATION_TIME;
  
      window.localStorage.setItem("token", _token);
      window.localStorage.setItem("tokenExpiration", expirationTime);
  
      setToken(_token);
      setClientToken(_token);
    } else if (savedToken) {
      const expirationTime = window.localStorage.getItem("tokenExpiration");
  
      if (Date.now() > expirationTime) {
        // Token expired
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("tokenExpiration");
        setToken(null); // Avoid infinite renders
      } else {
        setToken(savedToken);
        setClientToken(savedToken);
      }
    }
  }, []); // Empty dependency array ensures this runs only once
  
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



