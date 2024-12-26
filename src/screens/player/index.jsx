import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPlayer from "../../components/audioPlayer";
function Player() {
  const location = useLocation();
  console.log(location);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(location.state?.id);
  
  useEffect(() => {
    if (location.state) {
      apiClient.get(`playlists/${location.state?.id}/tracks`).then((res) => {
       

        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0]?.track);
      });
    }
  }, [location.state]);
  useEffect(() => {
   
    const call = () => {
      setCurrentTrack(tracks[currentIndex]?.track);
    };

    call();

   
  }, [currentIndex, tracks]);
 
  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        {/* {console.log("tracks",tracks[0]?.tracks?.preview_url)} */}
        <AudioPlayer 
        currentTrack={currentTrack} 
        isPlaying={true}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        total={tracks}
        />
      </div>
      <div className="right-player-body">
        <SongCard key={currentTrack?.album?.id} album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}

export default Player;
