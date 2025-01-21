import React from 'react';

interface ChatHistoryProps {
  messages: { id: string; text: string }[];
  onMessageSelect: (messageId: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, onMessageSelect }) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Chat History</h2>
      <ul>
        {messages.map((message) => (
          <li
            key={message.id}
            className="mb-2 p-2 bg-white rounded shadow cursor-pointer"
            onClick={() => onMessageSelect(message.id)}
          >
            {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHistory;