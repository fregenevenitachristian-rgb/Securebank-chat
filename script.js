// Toggle chat widget when icon is clicked
document.getElementById("chat-icon").addEventListener("click", () => {
  document.getElementById("chat-widget").style.display = "flex";
});

// Close chat widget when ✖ is clicked
document.getElementById("close-btn").addEventListener("click", () => {
  document.getElementById("chat-widget").style.display = "none";
});

// Helper: format timestamp
function getTimestamp() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Send message
document.getElementById("send-btn").addEventListener("click", async () => {
  const userMessage = document.getElementById("chat-input").value.trim();
  if (!userMessage) return;

  try {
    const response = await fetch("/chat", {   // ✅ relative path, works on Render
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div class="message customer">You: ${userMessage}<span class="timestamp">${getTimestamp()}</span></div>`;
    chatBox.innerHTML += `<div class="message admin">Server: ${data.reply}<span class="timestamp">${getTimestamp()}</span></div>`;

    document.getElementById("chat-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
  } catch (err) {
    console.error("Error sending message:", err);
  }
});

// Auto-update to show admin replies
async function loadMessages() {
  try {
    const res = await fetch("/messages");   // ✅ relative path
    const data = await res.json();
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";
    data.forEach(msg => {
      const roleClass = msg.from === "customer" ? "customer" : "admin";
      chatBox.innerHTML += `<div class="message ${roleClass}">${msg.from}: ${msg.text}<span class="timestamp">${getTimestamp()}</span></div>`;
    });
    chatBox.scrollTop = chatBox.scrollHeight; // auto-scroll
  } catch (err) {
    console.error("Error loading messages:", err);
  }
}

// Refresh every 3 seconds
setInterval(loadMessages, 3000);