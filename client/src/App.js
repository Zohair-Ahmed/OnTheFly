// client/src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState(null);

  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/random');
      const data = await response.json();
      setContent(data);
      console.log(data)
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  return (
    <div className="App">
      <h1>On The Fly</h1>
      <h4>Tell us the best story you can using the topic, prompt and picture below!</h4>
      <button onClick={fetchContent}>Generate Story Elements</button>

      {content && (
        <div>
          <h2>Topic: {content.topic}</h2>
          <h3>Prompt: {content.prompt}</h3>
          <img src={content.image} alt="Random" />
        </div>
      )}
    </div>
  );
}

export default App;