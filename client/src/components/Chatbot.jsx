import React, { useState } from "react";
import { FaComments } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! 👋 I’m your RoomMate Assistant — how can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Send message to Gemini backend
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "Sorry, I didn’t understand that 😅" },
      ]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I’m having trouble connecting to the server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          backgroundColor: "#000000b0",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
          zIndex: 9999,
        }}
      >
        <FaComments size={28} />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "25px",
            width: "320px",
            height: "420px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 9998,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#000000c9",
              color: "white",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            RoomMate Assistant 💬
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
            }}
          >
            {messages.map((msg, index) => (
              // <div
              //   key={index}
              //   style={{
              //     marginBottom: "8px",
              //     textAlign: msg.sender === "user" ? "right" : "left",
              //   }}
              // >
              //   <span
              //     style={{
              //       display: "inline-block",
              //       background:
              //         msg.sender === "user" ? "#000000c9" : "#e4e6eb",
              //       color: msg.sender === "user" ? "white" : "black",
              //       borderRadius: "12px",
              //       padding: "8px 12px",
              //       maxWidth: "80%",
              //       wordWrap: "break-word",
              //     }}
              //   >
              //     {msg.text}
              //   </span>
              // </div>
              <div
  key={index}
  style={{
    marginBottom: "8px",
    textAlign: msg.sender === "user" ? "right" : "left",
  }}
>
  <span
    style={{
      display: "inline-block",
      background: msg.sender === "user" ? "#000000c9" : "#e4e6eb",
      color: msg.sender === "user" ? "white" : "black",
      borderRadius: "12px",
      padding: "8px 12px",
      maxWidth: "80%",
      wordWrap: "break-word",
    }}
  >
    <ReactMarkdown>{msg.text}</ReactMarkdown>
  </span>
</div>
            ))}

            {/* Loading bubble */}
            {loading && (
              <div style={{ textAlign: "left", marginTop: "5px" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "#e4e6eb",
                    color: "#555",
                    borderRadius: "12px",
                    padding: "8px 12px",
                    fontStyle: "italic",
                  }}
                >
                  Typing...
                </span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div
            style={{
              display: "flex",
              borderTop: "1px solid #ddd",
              padding: "8px",
              background: "#fff",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "6px",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: "#000000c9",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "6px 12px",
              }}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
