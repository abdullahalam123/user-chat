import { FormEvent, useEffect, useRef } from "react";

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
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={sendMessage}>
      <input
        ref={inputRef}
        type="text"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};
