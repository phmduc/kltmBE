import express from "express";
import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";

const mailRouter = express.Router();

const GOOGLE_MAILER_CLIENT_ID =
  "59952435750-a5ou6j0159r229akbqb94orrmdie10ad.apps.googleusercontent.com";
const GOOGLE_MAILER_CLIENT_SECRET = "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";
const GOOGLE_MAILER_REFRESH_TOKEN =
  "1//04oSdD3nX5b5RCgYIARAAGAQSNwF-L9IrRjQQZbEPV3KPO7PWbUCb3dSHuwvZvBb3uXy7VKTjyKqR6S2YsiD3owP9TcHJh7cdfx0";
const ADMIN_EMAIL_ADDRESS = "phmduc1012@gmail.com";
const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
);
myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
});

mailRouter.post("/send", async (req, res) => {
  try {
    const { email, web } = req.body;
    if (!email) throw new Error("Please provide email, subject and content!");

    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
    const myAccessToken = myAccessTokenObject?.token;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: ADMIN_EMAIL_ADDRESS,
        clientId: GOOGLE_MAILER_CLIENT_ID,
        clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
        refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
        accessToken: myAccessToken,
      },
    });
    const mailOptions = {
      to: email, // Gửi đến ai?
      subject: "Xác thực tài khoản", // Tiêu đề email
      html: `<h3>Ấn vào đường link để xác minh: </h3> <a href='http://${web}'> click here </a>`, // Nội dung email
    };
    await transport.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: error.message });
  }
});

export default mailRouter;
