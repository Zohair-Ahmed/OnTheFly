// client/src/Image.js
import React, { useState } from 'react';
import './Image.css';

function Image() {
  const [image, setImage] = useState(null);

  const fetchPrompt = async () => {
    try {
      const image = await fetch('http://localhost:5001/api/image');
      const imageData = await image.json();
      setImage(imageData)
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchPrompt}>Generate Image</button>
      {image && (
        <div>
          <img src={image.image} alt="Random" />
        </div>
      )}
    </div>
  );
}

export default Image;
