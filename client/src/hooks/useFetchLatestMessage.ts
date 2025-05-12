import { useEffect, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { getMessagesService } from "../services/messagesService";

export const useFetchLatestMessage = (chat: any) => {
  const { notifications, currentChat } = useChatContext();
  const [latestMessage, setLatestMessage] = useState<any>(null);

  useEffect(() => {
    const getMessages = async () => {
      const response = await getMessagesService(chat._id);
      console.log("response", response);

      if (response.status === 200) {
        const data = response.data;
        setLatestMessage(data[data.length - 1]);
      } else {
        console.error("Error fetching messages: ", response.statusText);
      }
    };

    getMessages();
  }, [notifications, currentChat]);
  return latestMessage;
};
