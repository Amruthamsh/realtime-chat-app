import axiosInstance from "./axiosInstance";

export const getMessagesService = (chatId: string) => {
  return axiosInstance.get(`/message/${chatId}`);
};

export const sendTextMessageService = (
  textMessage: string,
  sender: string,
  currentChatId: string
) => {
  return axiosInstance.post("/message", {
    text: textMessage,
    senderId: sender,
    chatId: currentChatId,
  });
};
