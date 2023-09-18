const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
if (typeof fetch !== 'function') {
  global.fetch = require('node-fetch');
}
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
app.use(express.static(path.join(__dirname, 'frontend/build')));

const apiKey = process.env.SENDGRID_API_KEY;

app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.post('/send-email', async (req: any, res: any) => {
  try {
    console.log("Received request for /send-email");
    const { name, email, message, recaptchaValue } = req.body;

    console.log("Verifying CAPTCHA");
    const captchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecretKey}&response=${recaptchaValue}`;

    const captchaResponse = await fetch(verificationURL, { method: 'POST' });
    const captchaData = await captchaResponse.json() as CaptchaData;

    if (!captchaData.success) {
      console.log("Captcha verification failed");
      return res.status(400).send({ status: 'Captcha verification failed' });
    }

    console.log("Creating transporter");
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: apiKey,
      },
    });

    const mailOptions = {
      from: 'no-reply@kevinkirton.com',
      to: 'me@kevinkirton.com',
      subject: 'New Contact Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    console.log("Sending mail");
    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log("Error in sending mail:", error);
        return res.status(500).send({ status: 'fail', error });
      }
      console.log("Mail sent:", info);
      res.status(200).send({ status: 'success', info });
    });

  } catch (e) {
    console.log("Caught exception:", e);
    res.status(500).send({ status: 'fail', error: e });
  }
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