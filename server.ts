import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch'; // For CAPTCHA verification
import cors from 'cors';
import path from 'path';
import { config } from 'dotenv';

interface CaptchaData {
  success: boolean;
}

config({ path: '.env' });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend/build'));

const apiKey = process.env.SENDGRID_API_KEY;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.post('/send-email', async (req, res) => {
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
      pass: apiKey
    }
  });  

  const mailOptions = {
    from: email,
    to: 'me@kevinkirton.com',
    subject: 'New Contact Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ error });
    }
    res.status(200).send({ info });
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
