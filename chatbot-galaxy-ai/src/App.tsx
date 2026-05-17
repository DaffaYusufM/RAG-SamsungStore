import { useState } from 'react';
import ChatWindow from './components/chatWindow';
import ChatInput from './components/ChatInput';
import { sendMessage } from './service/groqService';
import type { Message } from './types/Message';
import './style.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const newUserMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Send the entire chat history
      const responseText = await sendMessage(text, messages);
      const newBotMsg: Message = { role: 'model', content: responseText };
      setMessages((prev) => [...prev, newBotMsg]);
    } catch (error: any) {
      const errorMsg: Message = {
        role: 'model',
        content: `Error: ${error.message || 'Terjadi kesalahan saat menghubungi API.'}`
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Galaxy AI Assistant</h1>
        <p>Tanya apapun tentang fitur & produk Galaxy AI is Here di Samsung Official Store</p>
      </header>
      <main className="chat-container">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
