import axios from "axios";

const API =axios.create({
    baseURL : "http://localhost:5000/users",
})


export const registerUser = (data) => API.post("/users", data);

export const loginUser = (email) =>
  API.get(`/users?email=${email}`);

export const getUserById = (id) =>
  API.get(`/users/${id}`);

export const checkUsername = (username) =>
  API.get(`/users?username=${username}`);