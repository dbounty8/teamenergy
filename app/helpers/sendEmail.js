const nodemailer = require('nodemailer');
const gmailPassword = process.env.GMAIL_PASSWORD;

function sendEmail(sendTo, subject, body){

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'teamenergy.mcr@gmail.com',
      pass: gmailPassword
    }
  });
  
  const mailOptions = {
    from: 'teamenergy.mcr@gmail.com', // sender address
    to: sendTo, // list of receivers
    subject: subject, // Subject line
    html: body// plain text body
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });  
}


module.exports = sendEmail;