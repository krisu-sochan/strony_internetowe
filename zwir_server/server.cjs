

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require('dotenv').config({ path: './mail.env' });

console.log("✅ Ładuję .env...");

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "✔️ JEST" : "❌ BRAK");
console.log("MAIL_TO:", process.env.MAIL_TO);


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Działa"))

app.post("/send", async (req, res) => {
  const { name, email, message,number } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      subject: `Wiadomość od ${name}`,
      text: `Imię i nazwisko: ${name}
    Email: ${email}
    Numer telefonu: ${number}
    Wiadomość:
    ${message}`
    });
    

    res.status(200).json({ success: true, message: "Wiadomość wysłana!" });
  } catch (err) {
    console.error("Błąd podczas wysyłania maila:", err);  // <-- dokładne logowanie
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "✔️ jest" : "❌ brak");
