import { MessageInput } from "./components/message-input";
import { MessageList } from "./components/message-list";
import useChat from "./hooks/useChat";

const App = () => {
  const { message, setMessage, messages, sendMessage } = useChat();

  return (
    <div>
      <h1>Chatt 🗨️</h1>
      <MessageList messages={messages} />
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default App;
