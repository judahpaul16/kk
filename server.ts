import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'YOUR_EMAIL@gmail.com',
      pass: 'YOUR_PASSWORD'
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
