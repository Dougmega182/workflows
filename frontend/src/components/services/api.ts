import axios from "axios";

const API_URL = "http://localhost:8000";

export const signIn = async (formData: {
  name: string;
  mobile: string;
  company: string;
  swms: boolean;
}) => {
  return await axios.post(`${API_URL}/sign-in`, formData);
};
