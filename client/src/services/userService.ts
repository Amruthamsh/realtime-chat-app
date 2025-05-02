import axios from "./axiosInstance";

export const getUserById = (id: string) => {
  return axios.get(`/user/find/${id}`);
};

export const getAllUsers = () => {
  return axios.get("/user/");
};
