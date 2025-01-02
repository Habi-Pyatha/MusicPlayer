import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";
import Controls from "./controls";
export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  // console.log(currentTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  // var audioSrc ="Akon.mp3";
  // const audioRef = new Audio("Akon.mp3");
  var audioSrc ="https://p.scdn.co/mp3-preview/b51d0ed637d2e5cb3eb27565cce9a06f95599077";
  const audioRef = useRef(new Audio("https://p.scdn.co/mp3-preview/b51d0ed637d2e5cb3eb27565cce9a06f95599077"));
  // console.log("audioSRc", total);

// console.log("navi",currentTrack?.href)
// console.log("total",total);
  // var audioSrc = total[currentIndex]?.track?.preview_url;
  // const audioRef = useRef(new Audio(total[0]?.track?.preview_url));

  const intervalRef = useRef();
  const isReady = useRef(false);
  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
  // console.log(currentPercentage);

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  // useEffect(() => {
  //   if (isPlaying && audioRef.current) {
  //     audioRef.current = new Audio(audioSrc);
  //     audioRef.current.play();
  //     startTimer();
  //   } else {
  //     clearInterval(intervalRef.current);
  //     audioRef.current.pause();
  //   }
  // }, [isPlaying]);
  useEffect(() => {
    if(audioRef.current.src){
      if (isPlaying ) {
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }else{
      if (isPlaying ) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.play();
        startTimer();
      } else {
        clearInterval(intervalRef.current);
        audioRef.current.pause();
      }
    }
  }, [isPlaying,audioSrc, startTimer]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
    else setCurrentIndex(currentIndex - 1);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const artists = [];
  currentTrack?.artists?.forEach((element) => {
    artists.push(element.name);
  });
  if (!currentTrack) {
    return <div>Loading Current Track information ...</div>;
  }
  return (
    <div className="player-body">
      <div className="player-left-body">
        <ProgressCircle
          percentage={currentPercentage}
          isPlaying={true}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#c96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(",")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0.{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0.30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>

      </div>
      {/* <iframe width="100%" height="52" src="https://odesli.co/embed/?url=https%3A%2F%2Fsong.link%2Fs%2F0Jcij1eWd5bDMU5iPbxe2i&theme=light" frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox" allow="clipboard-read; clipboard-write"></iframe> */}
    </div>
  );
}
