const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

let messages = [];

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  messages.push({ from: "customer", text: userMessage });
  res.json({ reply: "Message received. Please wait for a reply." });
});

app.post('/reply', (req, res) => {
  const replyMessage = req.body.message;
  messages.push({ from: "admin", text: replyMessage });
  res.json({ status: "Reply sent" });
});

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});