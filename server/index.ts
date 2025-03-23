import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port: number = 3001; // or any port you prefer

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Define interfaces for request body
interface MailRequest {
  subject: string;
  html: string;
}

// Mailer function
const sendMail = async (req: Request<Record<string, never>, Record<string, never>, MailRequest>, res: Response): Promise<void> => {
  const { subject, html } = req.body;

  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'gmail'
    auth: {
      user: "influxoks@gmail.com", // your email
      pass: process.env.GMAIL_APP_PASSWORD, // your email password from .env
    },
  });

  // Email options
  const mailOptions = {
    from: "influxoks@gmail.com", // sender address
    to: "influxoks@gmail.com", // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  };

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent", info });
  } catch (error) {
    res.status(500).send({ 
      message: "Error sending email", 
      error: error instanceof Error ? error.message : String(error) 
    });
  }
};

// Route to handle mail sending
app.post("/api/mail", sendMail);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
