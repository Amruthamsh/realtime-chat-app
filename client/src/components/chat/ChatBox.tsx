import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { useChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import InputEmoji from "react-input-emoji";
import { IoIosSend } from "react-icons/io";

const ChatBox = () => {
  const { user } = useAuth();
  const {
    currentChat,
    messages,
    isMessagesLoading,
    messagesError,
    sendTextMessage,
  } = useChatContext();
  const { recipient } = useFetchRecipient(currentChat, user);

  const [textMessage, setTextMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  if (!recipient) {
    return <div>No conversation selected yet...</div>;
  }

  if (isMessagesLoading) {
    return <div>Loading messages...</div>;
  }

  if (messagesError) {
    return <div>Error: {messagesError}</div>;
  }
  return (
    <div className="border-2 border-gray-300 rounded-xl p-4 w-full h-full flex flex-col">
      <h1 className="text-xl text-center border-b mb-2">
        Chat with {recipient?.name}
      </h1>

      <div className="flex flex-col justify-between flex-1 overflow-hidden">
        {/* Scrollable message area */}
        <div className="flex-1 overflow-y-auto pr-2">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex w-full my-2 ${
                message.senderId === user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div className="p-2 rounded-lg bg-gray-200 max-w-[70%]">
                <p>{message.text}</p>
                <span className="text-xs text-gray-500 block text-right mt-1">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="gray"
            shouldReturn={false}
            shouldConvertEmojiToImage={false}
          />
          <button
            onClick={() =>
              sendTextMessage(
                textMessage,
                user!.id,
                currentChat?._id,
                setTextMessage
              )
            }
            className="bg-cyan-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            <IoIosSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
