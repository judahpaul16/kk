import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }
    // Make API call to send email
  };

  return (
    <div>
      <h1>Contact</h1>
      <p>Response time is roughly 1 day.</p>
      <form>
        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
        <textarea name="message" placeholder="Your Message" onChange={handleInputChange}></textarea>
        <ReCAPTCHA sitekey="YOUR_GOOGLE_RECAPTCHA_KEY" />
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default Contact;