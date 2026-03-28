import axios from "axios";

const API = axios.create({
  baseURL: "https://69c49aac8a5b6e2dec2af447.mockapi.io",

});

export const registerUser = (data) => API.post("/users", data);

export const loginUser = (email) =>
  API.get(`/users?email=${email}`);

export const getUserById = (id) =>
  API.get(`/users/${id}`);

export const checkUsername = () =>
  API.get(`/users`);

export const updateUser = (id, data) =>
  API.put(`/users/${id}`, data);