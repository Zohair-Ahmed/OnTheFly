// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const promptsFile = require('./data/prompts.json');
const topicsFile = require('./data/topics.json');
const axios = require('axios'); // Install axios for API requests: npm install axios

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler for React routing
app.get('*', async (_, res) => {
  try {
    const randomPrompt = promptsFile.prompts[Math.floor(Math.random() * promptsFile.prompts.length)];

    res.json({
      prompt: randomPrompt,
    })
  } catch (error) {
    res.status(500).send("Error generating random content.");
  }
});

app.get('/api/prompt', async (_, res) => {
  try {
    const randomPrompt = promptsFile.prompts[Math.floor(Math.random() * promptsFile.prompts.length)];

    res.json({
      prompt: randomPrompt,
    })
  } catch (error) {
    res.status(500).send("Error generating random content.");
  }
});

app.get('/api/topic', async (_, res) => {
  try {
    const randomTopic = topicsFile.topics[Math.floor(Math.random() * topicsFile.topics.length)];

    res.json({
      topic: randomTopic,
    })
  } catch (error) {
    res.status(500).send("Error generating random content.");
  }
});

app.get('/api/image', async (_, res) => {
  try {
    // Fetch a random image
    const imageResponse = await axios.get('https://picsum.photos/400/300', { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');

    res.json({
      image: `data:image/jpeg;base64,${base64Image}`
    })
  } catch (error) {
    res.status(500).send("Error generating random content.");
  }
});