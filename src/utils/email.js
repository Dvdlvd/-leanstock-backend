import nodemailer from "nodemailer";

export const transporter =
  nodemailer.createTransport({

    host: "smtp.mail.ru",

    port: 465,

    secure: true,

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }

  });

export const sendVerificationEmail =
  async (email, token) => {

    const verifyUrl =
      `http://localhost:3000/auth/verify/${token}`;

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "LeanStock Email Verification",

      html: `
        <h2>LeanStock</h2>

        <p>Verify your email:</p>

        <a href="${verifyUrl}">
          Verify Email
        </a>
      `
    });

};