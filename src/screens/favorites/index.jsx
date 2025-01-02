import React, { useEffect } from "react";
import { parseBuffer } from "music-metadata-browser";  // Import parseBuffer function

function Favorites() {
  const extractAlbumArt = async (file) => {
    try {
      // Create a file reader to read the file as a buffer
      const reader = new FileReader();
      reader.onload = async () => {
        const buffer = reader.result;
        const metadata = await parseBuffer(buffer);  // Use parseBuffer instead of parseBlob
        if (metadata.common.picture && metadata.common.picture.length > 0) {
          const picture = metadata.common.picture[0];
          const fileName = "album-art.jpg";
          const albumArtUrl = URL.createObjectURL(new Blob([picture.data], { type: picture.format }));
          console.log(`Album art URL created: ${albumArtUrl}`);

          // For demonstration, you can append the album art to the body
          const img = new Image();
          img.src = albumArtUrl;
          document.body.appendChild(img);
        } else {
          console.log("No album art found");
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading the file:", error.message);
      };

      reader.readAsArrayBuffer(file);  // Read the file as a buffer
    } catch (error) {
      console.error("Error reading metadata:", error.message);
    }
  };

  useEffect(() => {
    const fileInput = document.getElementById("audio-file-input");

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        extractAlbumArt(file);  // Extract album art when the file is selected
      }
    });
  }, []);

  return (
    <div className="screen-container">
      <input type="file" id="audio-file-input" accept="audio/*" />
      <div>Favorites</div>
    </div>
  );
}

export default Favorites;
