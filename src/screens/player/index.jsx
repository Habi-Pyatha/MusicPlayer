import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPlayer from "../../components/audioPlayer";
function Player() {
  const location = useLocation();
  // console.log(location);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(location.state?.id);
  
  useEffect(() => {
    if (location.state) {
      apiClient.get(`playlists/${location.state?.id}/tracks?market=US`).then((res) => {
        // console.log(res.data.items);

        setTracks(res.data.items);
        setCurrentTrack(res.data.items[0]?.track);
      });
    }
  }, [location.state]);
  useEffect(() => {
    // console.log("Current index updated:", currentIndex);
    // console.log("upupup",tracks[currentIndex]?.track);
    // console.log("downdown",currentTrack);
    const call = () => {
      setCurrentTrack(tracks[currentIndex]?.track);
    };

    call();

    // console.log("downdown",currentTrack);
    // console.log("current track habi:",currentTrack);

    //   if (currentTrack && tracks[currentIndex]) {
    //     }
  }, [currentIndex, tracks]);
  // useEffect(() => {
  //   console.log("Updated currentTrack:", currentTrack);
  // }, [currentTrack]);
  // const hasAlbum= currentTrack && currentTrack.album;
  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        {console.log("tracks",tracks[0]?.tracks?.preview_url)}
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
