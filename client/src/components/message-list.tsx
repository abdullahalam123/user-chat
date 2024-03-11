import { Message } from "../hooks/useChat";

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <span style={{ fontWeight: "bold", color: msg.color }}>
            {msg.username}:
          </span>{" "}
          {msg.message}
        </div>
      ))}
    </div>
  );
};
