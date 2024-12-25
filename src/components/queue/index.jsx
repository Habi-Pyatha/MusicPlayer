import React from "react";
import "./queue.css";
export default function Queue({ tracks, setCurrentIndex }) {
  if (!tracks) {
    return <div>Loading Tracks information ...</div>;
  }
  // console.log("tracks", tracks);
  // console.log("name", tracks[0]?.track?.name);
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks?.map((track, index) => (
            <div
              key={index + "key"}
              className="queue-item flex"
              onClick={() => {
                setCurrentIndex(index);
              }}
            >
              <p className="track-name">
                {track?.track?.name || "unknown track"}
              </p>

              <p>
                {Math.floor(track?.track?.duration_ms / 60000)}:
                {((track?.track?.duration_ms % 60000) / 1000)
                  .toFixed(0)
                  .padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
