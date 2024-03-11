import { useState, useEffect } from "react";
import socketIOClient, { Socket } from "socket.io-client";

let ENDPOINT: string;
if (process.env.NODE_ENV === "development") {
  ENDPOINT = "http://localhost:5000";
} else {
  ENDPOINT = "https://user-chat.onrender.com";
}

export interface Message {
  message: string;
  username: string;
  color: string;
}

const useChat = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);

    // Receive messages from the server
    newSocket.on("receive-message", (data: Message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: data.message, username: data.username, color: data.color },
      ]);
    });

    // Handle errors
    newSocket.on("error", (error: Error) => {
      console.error("Socket error:", error);
    });

    setSocket(newSocket);

    // Clean up the effect
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (socket && message.trim().length > 0) {
      socket.emit("send-message", message);
      setMessage("");
    }
  };

  return { message, setMessage, messages, sendMessage };
};

export default useChat;
