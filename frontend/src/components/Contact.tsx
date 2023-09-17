import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState('');

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value ? value : '');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required.');
      return;
    }
    
    // Make API call to send email
    const response = await fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, recaptchaValue }), // include recaptchaValue
    });
  
    const data = await response.json();
  
    if (data.status === 'success') {
      closeModal();
    } else if (data.status === 'fail') {
      setError('Something went wrong. Please try again.');
    }
  };  

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Contact</h1>
        <p>Response time is roughly 1 day.</p>
        <form>
          <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
          <textarea name="message" placeholder="Your Message" onChange={handleInputChange}></textarea>
          <div className="captcha-wrapper">
            <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || ''} onChange={handleRecaptchaChange} /> 
          </div>
          <button type="button" className='btn' onClick={handleSubmit}>Submit</button>
          <button type="button" className='btn btn-cancel' onClick={closeModal}>Cancel</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
    </div>
  );
};

export default Contact;