import axios from "./axiosInstance";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const registerService = (data: RegisterData) => {
  return axios.post("/user/register", data);
};

export const loginService = (data: LoginData) => {
  return axios.post("/user/login", data);
};
