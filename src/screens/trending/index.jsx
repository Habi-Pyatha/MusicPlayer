import React, {useState} from 'react'
import ReactAudioPlayer from 'react-audio-player';
import { ImPrevious } from "react-icons/im";
import { ImNext } from "react-icons/im";


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
                    <div key={index}   >
                        <span className='song-name' onClick={()=>handleSongClick(index) }     style={{
                            cursor: 'pointer',
                            margin: '10px 5px',
                            color: currentSongIndex === index ? 'green' : 'blue',
                        }}>
                            {song.name}
                        </span>
                        
                    </div>
                    
                ))}
                </div>
                
                <div className='line-animations'>
                <div class="now playing" id="music">
                        <span class="bar n1">A</span>
                        <span class="bar n2">B</span>
                        <span class="bar n3">c</span>
                        <span class="bar n4">D</span>
                        <span class="bar n5">E</span>
                        <span class="bar n6">F</span>
                        <span class="bar n7">G</span>
                        <span class="bar n8">H</span>
                        <span class="bar n1">A</span>
                        <span class="bar n2">B</span>
                        <span class="bar n3">c</span>
                        <span class="bar n4">D</span>
                        <span class="bar n5">E</span>
                        <span class="bar n6">F</span>
                        <span class="bar n7">G</span>
                        <span class="bar n8">H</span>
                        <span class="bar n1">A</span>
                        <span class="bar n2">B</span>
                        <span class="bar n3">c</span>
                        <span class="bar n4">D</span>
                        <span class="bar n5">E</span>
                        <span class="bar n6">F</span>
                        <span class="bar n7">G</span>
                        <span class="bar n8">H</span>
                        <span class="bar n1">A</span>
                        <span class="bar n2">B</span>
                        <span class="bar n3">c</span>
                        <span class="bar n4">D</span>
                        <span class="bar n5">E</span>
                        <span class="bar n6">F</span>
                        <span class="bar n7">G</span>
                        <span class="bar n8">H</span>
                        <span class="bar n1">A</span>
                        <span class="bar n2">B</span>
                        <span class="bar n3">c</span>
                        <span class="bar n4">D</span>
                        <span class="bar n5">E</span>
                        <span class="bar n6">F</span>
                        <span class="bar n7">G</span>
                        <span class="bar n8">H</span>
                        <span class="bar n1">A</span>
                        <span class="bar n2">B</span>
                        <span class="bar n3">c</span>
                        <span class="bar n4">D</span>
                        <span class="bar n5">E</span>
                        <span class="bar n6">F</span>
                        <span class="bar n7">G</span>
                        <span class="bar n8">H</span>
                        <span class="bar n1">A</span>
                        <span class="bar n2">B</span>
                        <span class="bar n3">c</span>
                        <span class="bar n4">D</span>
                        <span class="bar n5">E</span>
                        <span class="bar n6">F</span>
                        
                        </div>
                        
                </div>
                <div className='audio-player'>
                    <button onClick={handlePrev} disabled={songs.length<=1}><ImPrevious />
                    </button>

                    <ReactAudioPlayer
                                src={songs[currentSongIndex].path}
                                autoPlay
                                controls
                                />
                    <button onClick={handleNext} disabled= {songs.legth<=1}> <ImNext /></button>
                    
                    
                </div>
            </div>
            
        </div>
    )
}

export default Trending
