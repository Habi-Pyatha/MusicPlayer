import React from 'react'
import './albumInfo.css'
export default function AlbumInfo( {album}) {
  if(!album){
    return <div>Loading album information ...</div>
  }
  // console.log(album);
  const artists =[];
  album?.artists?.forEach(element=>{
      artists.push(element.name);
  });
// console.log("test",artists.join(","));
// console.log(album.name)

  return (
    <div className='albumInfo-card'>
      <div className="albumName-container">
        <div className="marquee">
        <p>{album.name + " - " + artists?.join(",") }</p>
        </div>
      </div>
      <div className="album-info">
        <p> {`${album?.name} is an ${album?.album_type} by ${artists?.join(",")} with ${album.total_tracks} tracks`} </p>
      </div>
      <div className="album-release">
        <p>Release Date: {album?.release_date} </p>
      </div>
    </div>
  )
}
