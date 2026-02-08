const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));

let messages = [];

// Customer sends a message
app.post('/chat', (req, res) => {
  const { message, customer } = req.body;

  if (customer) {
    messages.push({
      from: customer.name,
      account: customer.account,
      phone: customer.phone,
      email: customer.email,
      text: message
    });
  } else {
    messages.push({ from: "customer", text: message });
  }

  res.json({ reply: "Message received. Please wait for a reply." });
});

// Admin replies
app.post('/reply', (req, res) => {
  const replyMessage = req.body.message;
  messages.push({ from: "admin", text: replyMessage });
  res.json({ status: "Reply sent" });
});

// Get all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Admin login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Replace with your own secure values
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "secure123";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Chat server running on port ${PORT}`);
});