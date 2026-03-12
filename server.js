const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.static('public'));

let messageQueue = [];

app.post('/send', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message' });
  messageQueue.push({ text: message, timestamp: new Date() });
  console.log('New message queued:', message);
  res.json({ success: true });
});

app.get('/fetch', (req, res) => {
  if (messageQueue.length > 0) {
    const msg = messageQueue.shift();
    res.json({ message: msg.text });
  } else {
    res.json({ message: null });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
