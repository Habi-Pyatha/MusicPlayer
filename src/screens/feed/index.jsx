import React, { useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import { ImPrevious } from "react-icons/im";
import { ImNext } from "react-icons/im";
import "./feed.css";
const audioFiles = require.context("../../songs", false, /\.(mp3|wav|ogg)$/);
// console.log(audioFiles)

const songs = audioFiles.keys().map((fileName) => ({
  name: fileName.replace("./", ""),
  path: audioFiles(fileName),
}));
function Feed() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  // console.log("songs",songs);
  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };
  const handlePrev = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };
  const handleSongClick = (index) => {
    setCurrentSongIndex(index);
  };

  const handleSongEnd = () => {
    handleNext();
  };
  return (
    <div className="screen-container">
      <div className="component">
        <div className="card">
          <div className="header">
            <img
              className="avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?auto=format&fit=crop&w=200&q=200"
              alt="User avatar"
            />
            <div className="info">
              <span className="status">now playing</span>
              <span className="song">
                {songs[currentSongIndex].name}
              </span>
              <span className="artist">-"Boston," Augustana</span>
              <div className="icons">
                <img
                  className="icon"
                  src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png"
                />
                <img
                  className="icon"
                  src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png"
                />
                <img
                  className="icon"
                  src="https://www.iconpacks.net/icons/2/free-favourite-icon-2765-thumb.png"
                />
              </div>
            </div>
          </div>
          <div className='controls'>
                    <button onClick={handlePrev} disabled={songs.length<=1}><ImPrevious />
                    </button>

                    <div className='audio-player-container'>
                    <ReactAudioPlayer
                                src={songs[currentSongIndex].path}
                                autoPlay
                                controls
                                onEnded={handleNext} disabled={songs.length<=1}
                                />
                    </div>
                    <button onClick={handleNext} disabled= {songs.legth<=1}> <ImNext /></button>
                    
                    
                </div>
          <div className="playlist">
            <div className="playlist-header">
              <span >Play List</span>
              <img
                className="filter-icon"
                src="https://p.kindpng.com/picc/s/152-1529312_filter-ios-filter-icon-png-transparent-png.png"
              />
            </div>
            {/*  */}
            {songs.map((song,index)=>(
                    <div className="playlist-item">
                    <img
                        className="playlist-avatar"
                        src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?auto=format&fit=crop&w=200&q=200"
                        alt="User avatar"
                    />
                    <div className="playlist-info">
                    <span className='song' onClick={()=>handleSongClick(index) }     style={{
                            cursor: 'pointer',
                            margin: '10px 5px',
                            color: currentSongIndex === index ? 'green' : 'blue',
                        }}>
                            {song.name}
                        </span>
                        <span className="artist">-"Boston," Augustana</span>
                    </div>
                    </div>
            ))}
            {/* <!-- Repeat for other playlist items --> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;

// {songs.map((song,index)=>(
                    
//     <span className='song' onClick={()=>handleSongClick(index) }     style={{
//         cursor: 'pointer',
//         margin: '10px 5px',
//         color: currentSongIndex === index ? 'green' : 'blue',
//     }}>
//         {song.name}
//     </span>
    


// ))}