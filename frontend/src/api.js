import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "autobots-dbgrgmdrgphhd0c9.australiasoutheast-01.azurewebsites.net";

export const signIn = async (data) => {
  return axios.post(`${API_URL}/signin`, data);
};

export const signOut = async (data) => {
  return axios.post(`${API_URL}/signout`, data);
};
