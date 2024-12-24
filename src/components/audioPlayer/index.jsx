import React from 'react'
import './audioPlayer.css'
import ProgressCircle from './progressCircle'
export default function AudioPlayer({currentTrack}) {
    if(!currentTrack){
        return <div>Loading Current Track information ...</div>
      }
    //   console.log(currentTrack.track_number);
  return (
    <div className='player-body'>
        <div className="player-left-body">
            <ProgressCircle
                percentage={75}
                isPlaying={true}
                image={currentTrack?.album?.images[0]?.url}
                size={300}
                color="#c96850"
            />
        </div>
        <div className="player-right-body"></div>
    </div>
  )
}
