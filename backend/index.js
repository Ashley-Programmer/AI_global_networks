import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = 3000;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(bodyParser.json());

app.post('/send-confirmation', async (req, res) => {
  const { email, name } = req.body;

  try {
    await resend.emails.send({
      from: 'info@aiglobalnetworks.co.za',
      to: email,
      subject: 'Form Submitted Successfully!',
      html: `<p>Hi ${name},</p><p>Thank you for your submission.</p>`
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
