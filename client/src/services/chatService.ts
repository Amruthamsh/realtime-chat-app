import axios from "./axiosInstance";

export const getUserChats = (userId: string) => {
  return axios.get(`/chat/${userId}`);
};

export const createChatService = (firstId: string, secondId: string) => {
  const data = {
    firstId,
    secondId,
  };
  return axios.post("/chat", data);
};
