import { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      setMessages([...newMessages, { text: res.data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <div className="h-80 overflow-y-auto p-3 border-b">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-3">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r-lg">Send</button>
      </div>
    </div>
  );
};

export default Chat;
