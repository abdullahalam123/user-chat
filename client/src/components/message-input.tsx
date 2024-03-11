import { FormEvent } from "react";

interface MessageInputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (event: FormEvent) => void;
}

export const MessageInput = ({
  message,
  setMessage,
  sendMessage,
}: MessageInputProps) => {
  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};
