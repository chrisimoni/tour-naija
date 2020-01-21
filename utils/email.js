const nodemailer = require('nodemailer');

const sendEmail = async options => {
  //Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  //Define email options
  const mailOptions = {
    from: 'Chris Imoni <cimoni@ncgafrica.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message // plain text body
    //html: '<b>Hello world?</b>' // html body
  };

  //Send the mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
