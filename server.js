const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8158;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from your Ringtones folder
app.use(express.static('/storage/emulated/0/Ringtones'));

let messages = [];

// Customer sends a message
app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  messages.push({ from: "customer", text: userMessage });
  res.json({ reply: "Message received. Please wait for a reply." });
});

// Admin sends a reply
app.post('/reply', (req, res) => {
  const replyMessage = req.body.message;
  messages.push({ from: "admin", text: replyMessage });
  res.json({ status: "Reply sent" });
});

// Admin fetches all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Chat server running on http://localhost:${PORT}`);
});