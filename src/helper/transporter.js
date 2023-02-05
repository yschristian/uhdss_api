const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const {userSignupTemplate,institutionTemplates,submitDetailsTemplate,forgotPasswordTemplate,requestTemplate,approveTemplates,createAgentTemplate} = require("./emailTemplates");

dotenv.config();

const sendEmail = async (userInfo, action) => {
  const transpoter = nodemailer.createTransport({
    host: 'uhdss.com',
    port: 465,
    secure: true,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  });

  let subject;
  let emailto;
  let data;
  switch (action) {
    case "createAccount":
      subject =  'Welcom to UHDSS ApplyAbroad';
      data = userSignupTemplate(userInfo);
      emailto = userInfo.email;
      break;

    case "createInstitution":
      subject = 'Welcom to UHDSS ApplyAbroad';
      data =institutionTemplates(userInfo)
      emailto = userInfo.email;
      break;

    case "createAgent":
      subject = 'Welcom to UHDSS ApplyAbroad';
      data =createAgentTemplate(userInfo)
      emailto = userInfo.email;
      break;

    case "forgotPassword":
      subject = 'Password reset request';
      data = forgotPasswordTemplate(userInfo)
      emailto = userInfo.email;
      break;

    case "submitDetails":
      subject = 'Your Information submitted Successfully';
      data = submitDetailsTemplate(userInfo);
      emailto = userInfo.email;
      break;

    case "approve":
      subject = 'Approve agent!';
      data = approveTemplates(userInfo)
      emailto = userInfo.email;
      break;

    case "request":
      subject = 'request to be agent!';
      data = requestTemplate(userInfo)
      emailto = userInfo.email;
    default:
      subject = "";
      break;
  }
  const mailOptions = {
    from: `"UHDSS Education Agency "<${process.env.EMAIL}>`,
    to: emailto,
    subject: subject,
    html: data,
  };
  try {
    const sendmail = transpoter.sendMail(mailOptions, (err, info) => {
      console.log(err);
      console.log(info);
      return sendmail;
    });
  } catch (error) {
    return error;
  }
};
module.exports = sendEmail;
