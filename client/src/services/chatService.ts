import axios from "./axiosInstance";

export const getUserChats = (userId: string) => {
  return axios.get(`/chat/${userId}`);
};
