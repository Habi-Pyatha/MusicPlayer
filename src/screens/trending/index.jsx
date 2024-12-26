import React, {useState} from 'react'
import ReactAudioPlayer from 'react-audio-player';
// import myAudioFiles from '../../songs';
import './trending.css'
const audioFiles = require.context("../../songs",false,/\.(mp3|wav|ogg)$/)
console.log(audioFiles)

const songs= audioFiles.keys().map((fileName)=>({
    name: fileName.replace('./',''),
    path: audioFiles(fileName),
}));

console.log(songs.length);
function Trending() {
    const [currentSongIndex,setCurrentSongIndex]=useState(0);
    // console.log("songs",songs);
    const handleNext =()=>{
        setCurrentSongIndex((prevIndex)=>(prevIndex+1)%songs.length);
    }
    const handlePrev =()=>{
        setCurrentSongIndex((prevIndex)=>(prevIndex-1+songs.length)%songs.length);
    }
    const handleSongClick = (index)=>{
        setCurrentSongIndex(index)
    }
    return (
        <div className='screen-container'>
            <div className='div-container '>
                <h2 className='song-title'>Trending Songs</h2>
                <div className='song-lists'>
                {songs.map((song,index)=>(
                    <div key={index} onClick={()=>handleSongClick(index) } className='song-name'>
                        {song.name}
                        
                    </div>
                    
                ))}
                </div>
                
                <div className='player-controls'>
                    
                </div>
                <div className='audio-player'>
                <button onClick={handlePrev} disabled={songs.length<=1}>Previous</button>

                <ReactAudioPlayer
                            src={songs[currentSongIndex].path}
                            autoPlay
                            controls
                            />
                <button onClick={handleNext} disabled= {songs.legth<=1}>Next</button>

                    
                </div>
            </div>
        </div>
    )
}

export default Trending
