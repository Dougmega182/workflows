import { useState } from "react";
import { signIn } from "../api";

export default function SignInForm() {
  const [formData, setFormData] = useState({ name: "", company: "", site: "", swms: false, induction: false });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Signing in...");
    try {
      await signIn(formData);
      window.location.href = "/success";
    } catch (error) {
      setMessage("Error signing in. Try again.");
    }
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="site" placeholder="Job Site" value={formData.site} onChange={handleChange} required className="w-full p-2 border rounded" />
        
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="swms" checked={formData.swms} onChange={handleChange} className="h-4 w-4" />
          <span>SWMS Completed</span>
        </label>

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="induction" checked={formData.induction} onChange={handleChange} className="h-4 w-4" />
          <span>Induction Completed</span>
        </label>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign In</button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
