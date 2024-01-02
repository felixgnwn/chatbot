import { useState } from "react";
import axios from "axios";

function MessageBox() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! What can I help you with?", sender: "bot", index: 0 },
  ]);

  let userIndex = 0; // Index counter for user messages
  let botIndex = 1; // Index counter for bot responses

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const addUserInputMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: "user", index: userIndex },
    ]);
    setUserInput("");
    userIndex += 2; // Increment user index by 2 for the next user message
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/get", {
        msg: userInput,
      });

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.response, sender: "bot", index: botIndex },
      ]);

      botIndex += 2; // Increment bot index by 2 for the next bot response
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCombinedClick = async () => {
    addUserInputMessage(); // Add user input as a separate message
    await handleSendMessage(); // Wait for handleSendMessage to complete
  };

  return (
    <div className="box mt-3">
      <div
        className="message-list"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        {messages.map((message) => (
          <div
            key={message.index} // Use the unique index as the key
            className={`d-flex justify-content-${
              message.sender === "user" ? "end" : "start"
            } mb-4`}
          >
            <span className={`${message.sender} chat d-inline-block`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message"
        />
        <button onClick={handleCombinedClick}>Send</button>
      </div>
    </div>
  );
}

export default MessageBox;
