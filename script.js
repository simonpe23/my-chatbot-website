async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;

const response = await fetch("https://twilight-wave-3777.tcsimon-p.workers.dev/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,

        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: userInput }],
            temperature: 0.7,
        }),
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    chatBox.innerHTML += `<p><strong>Bot:</strong> ${botReply}</p>`;

    document.getElementById("user-input").value = "";
}
