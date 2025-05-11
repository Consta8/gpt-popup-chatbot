
async function sendMessage() {
  const input = document.getElementById("userInput");
  const messages = document.getElementById("chatMessages");
  const userText = input.value.trim();
  if (!userText) return;
  messages.innerHTML += `<div><b>You:</b> ${userText}</div>`;
  input.value = "";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, no response.";
  messages.innerHTML += `<div><b>Bot:</b> ${reply}</div>`;
}

function toggleChat() {
  const widget = document.getElementById("chatWidget");
  widget.style.display = widget.style.display === "none" ? "flex" : "none";
}
