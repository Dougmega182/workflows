import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({
        name: '', phone: '', company: '', swms: false, siteInduction: false, signature: ''
    });

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('https://tradesmen-backend.azurewebsites.net/signin', formData);
        alert("Signed in successfully");
    };

    return (
        <div>
            <h1>Tradesmen Sign-In</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
                <input type="text" name="company" placeholder="Company" onChange={handleChange} required />
                <label>
                    <input type="checkbox" name="swms" onChange={handleChange} />
                    SWMS Completed
                </label>
                <label>
                    <input type="checkbox" name="siteInduction" onChange={handleChange} />
                    Site Induction Completed
                </label>
                <input type="text" name="signature" placeholder="Signature" onChange={handleChange} required />
                <button type="submit">Sign In</button>
            </form>
            <a href="https://yourstorageaccount.blob.core.windows.net/files/swms.pdf" target="_blank">SWMS Form</a>
            <a href="https://yourstorageaccount.blob.core.windows.net/files/site_induction.pdf" target="_blank">Site Induction Form</a>
        </div>
    );
}

export default App;
