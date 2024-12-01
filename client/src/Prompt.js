// client/src/PromptPage.js
import React, { useState } from 'react';

function Prompt() {
  const [prompt, setPrompt] = useState(null);
  const [topic, setTopic] = useState(null);

  const fetchPrompt = async () => {
    try {
      const prompt = await fetch('http://localhost:5001/api/prompt');
      const promptData = await prompt.json();
      
      const topic = await fetch('http://localhost:5001/api/topic');
      const topicData = await topic.json();
      setPrompt(promptData);
      setTopic(topicData)
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchPrompt}>Generate Prompt & Topic</button>
      {prompt && (
        <div>
          <h2>Topic: {topic.topic}</h2>
          <h3>Prompt: {prompt.prompt}</h3>
        </div>
      )}
    </div>
  );
}

export default Prompt;
