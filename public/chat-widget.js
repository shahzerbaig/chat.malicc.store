// Create the chat widget HTML
const chatWidget = document.createElement("div");
chatWidget.id = "chat-widget";
chatWidget.innerHTML = `
  <div id="chat-messages" style="height: 200px; overflow-y: scroll; border: 1px solid #ccc; padding: 10px;"></div>
  <input id="chat-input" type="text" placeholder="Ask a question..." style="width: 100%; padding: 10px;" />
  <button onclick="sendMessage()" style="width: 100%; padding: 10px; margin-top: 10px;">Send</button>
`;

// Append the widget to the body
document.body.appendChild(chatWidget);

console.log("Hello Malicc");

// Function to send a message
async function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value;
  input.value = "";

  // Display user message
  const chatMessages = document.getElementById("chat-messages");
  chatMessages.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

  // Send message to backend
  try {
    const response = await fetch("https://api.malicc.store/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();

    // Display AI response
    chatMessages.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
  } catch (error) {
    console.error("Error:", error);
    chatMessages.innerHTML += `<div><strong>Error:</strong> Failed to get response from AI</div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("JavaScript file loaded successfully!");
});
