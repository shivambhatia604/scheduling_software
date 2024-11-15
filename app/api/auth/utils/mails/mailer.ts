import { createTransport } from "nodemailer";
type mailerOptions = {
  to: string,
  subject: string
  text?: string,
  html?: string
  }
  
const mailer = async (option:mailerOptions) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Set to true if using port 465 (SSL/TLS)
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  const message = {
    from: 'Sender Name <sender@example.com>', // sender address
    to: option.to, // list of receivers
    subject: option.subject, // Subject line
    text: option.text, // plain text body
    html: option.html,
  };
console.log("this is hte message \n", message)
  // send mail with defined transport object
 return transporter.sendMail(message);
};

export default mailer;
