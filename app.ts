const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const port = process.env.PORT || 3000;
dotenv.config({ path: '.env' });

interface CaptchaData {
  success: boolean;
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public_html')));

const apiKey = process.env.SENDGRID_API_KEY;

app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../public_html', 'index.html'));
});

app.post('/send-email', async (req: any, res: any) => {
  const { name, email, message, recaptchaValue } = req.body;

  // Verify CAPTCHA
  const captchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${recaptchaValue}`;

  const captchaResponse = await fetch(verificationURL, {
    method: 'POST',
  });
  const captchaData = await captchaResponse.json() as CaptchaData;

  if (!captchaData.success) {
    return res.status(400).send({ status: 'Captcha verification failed' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey', // Don't change this
      pass: apiKey,
    },
  });

  const mailOptions = {
    from: email,
    to: 'me@kevinkirton.com',
    subject: 'New Contact Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      return res.status(500).send({ error });
    }
    res.status(200).send({ info });
  });  
});

if (process.env.NODE_ENV === 'production') {
  // Export the app for production (e.g., when using Phusion Passenger)
  module.exports = app;

} else {
  // Start the server for local development and testing
  app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
  });
}