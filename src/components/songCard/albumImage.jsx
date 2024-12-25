import React from 'react'
import './albumImage.css'
export default function AlbumImage({url}) {
  // console.log("test",url);
  return (
    
    <div>
       <div className="albumImage ">
          <img src={url} alt="Album art" className='albumImage-art' />
          <div className="albumImage-shadow">
            <img src={url} alt="shadow" className='albumImage-shadow' />
          </div>
       </div>
    </div>
  )
}

