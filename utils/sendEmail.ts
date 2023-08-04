import nodemailer from "nodemailer";
import { html } from "./htmlEmail";
interface sendMailInterface {
  to: string;
  url: string;
  text: string;
}
const sendMail = async ({ to, url, text }: sendMailInterface) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EmailUser,
      pass: process.env.EmailPassword,
    },
  });
  const mailOption = {
    from: process.env.EmailUser,
    to,
    subject: "Naresh - Bhosale | NextAuthV4",
    html: html({ url, text }),
  };
  const result = await transporter.sendMail(mailOption);
  console.log(`🚀 ~ result:`, result);
  return result;
};
export default sendMail;
