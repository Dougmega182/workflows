import { useState } from "react";
import axios from "axios";

export default function SignInOutPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    site: "",
    swms: false,
    induction: false,
    action: "sign-in", // Default to sign-in
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    try {
      const endpoint =
        formData.action === "sign-in" ? "/signin" : "/signout";
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}${endpoint}`,
        formData
      );
      setMessage(response.data.message || "Success!");
    } catch (error) {
      setMessage("Error processing request. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">
          {formData.action === "sign-in" ? "Sign In" : "Sign Out"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="site"
            placeholder="Job Site"
            value={formData.site}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="swms"
              checked={formData.swms}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-gray-700">SWMS Completed</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="induction"
              checked={formData.induction}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-gray-700">Induction Completed</label>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              onClick={() => setFormData({ ...formData, action: "sign-in" })}
              className="w-1/2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Sign In
            </button>
            <button
              type="submit"
              onClick={() => setFormData({ ...formData, action: "sign-out" })}
              className="w-1/2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
