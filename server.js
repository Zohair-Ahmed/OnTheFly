// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const promptsFile = require('./data/prompts.json');
const topicsFile = require('./data/topics.json');
const axios = require('axios'); // Install axios for API requests: npm install axios

app.get('/api/random', async (req, res) => {
  try {
    const randomTopic = topicsFile.topics[Math.floor(Math.random() * topicsFile.topics.length)];
    const randomPrompt = promptsFile.prompts[Math.floor(Math.random() * promptsFile.prompts.length)];

    // Fetch a random image
    const imageResponse = await axios.get('https://picsum.photos/400/300', { responseType: 'arraybuffer' });
    const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');

    res.json({
      topic: randomTopic,
      prompt: randomPrompt,
      image: `data:image/jpeg;base64,${base64Image}`
    })
  } catch (error) {
    res.status(500).send("Error generating random content.");
  }
});