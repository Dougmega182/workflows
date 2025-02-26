import { useState } from "react";
import { signOut } from "../api";

export default function SignOutForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    site: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Signing out...");
    try {
      await signOut(formData);
      window.location.href = "/success";
    } catch (error) {
      setMessage("Error signing out. Try again.");
    }
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Sign Out</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="site"
          placeholder="Job Site"
          value={formData.site}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Sign Out
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
