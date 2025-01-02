import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay, FaSign } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import apiClient from "../../spotify";

function Sidebar({logout}) {
  const [image, setImage] = useState(
    "https://plus.unsplash.com/premium_photo-1676637000058-96549206fe71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  useEffect(() => {
    apiClient.get("me").then((response) => {
      const imageUrl = response.data.images?.[0]?.url;
        
      if (imageUrl) {
        setImage(imageUrl);
      }
    });
  }, []);
  const handleLogout=()=>{
    console.log("clicked.")
    
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration")
      window.location.reload()
  }
  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdFavorite />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        {/* <SidebarButton title="Favorites" to="/favorites"icon={<MdFavorite />}/> */}
        <SidebarButton title="Library" to="/" icon={<IoLibrary />} />
      </div>
      <span onClick={()=>{handleLogout()}}>

      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />}  />
      </span>
      
    </div>
  );
}

export default Sidebar;
