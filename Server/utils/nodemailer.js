import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADD,
    pass: process.env.EMAIL_PASS,
  },
});
export const sendOtpMail = async (to, otp) => {
  try {
    const mailOptions = {
      from: "",
      to: "",
      sub: "OTP FORM THE MERN PROJECT",
      text: `Hey,the otp of mern project is ${otp} will expire in 5 min.
            Don't share your otp with unkhown resourses`,
    };
    await transport.sendMail(mailOptions);
  } catch (error) {
    return new Error("Error while send OTP");
  }
};
