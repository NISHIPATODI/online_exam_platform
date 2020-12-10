const {
    okResponse,
    badRequestError,
    to,
    unverifiedError,
    loginResponse,
  } = require("../../../global_functions");
  const Admin = require("../../models/adminModel");
  const Student = require("../../models/studentModel");
  const Teacher = require("../../models/teacherModel");
  var nodemailer = require('nodemailer');

  const Invitelink = async (req, res) => {
    console.log(req.body);
   // let { branch,year,section} = req.body;
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nishi.patodi@gmail.com',

          pass: process.env.pwd
        }
      });
      let mail="sandeepsinghgour0@gmail.com";
      let pwd="12345"
      var mailOptions = {
        from: "nishi.patodi@gmail.com",
        to: mail,
        subject: 'Sending Email using Node.js',
        text: `pwd is ${pwd}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
res.send("Mail sent")

}

module.exports = {
    Invitelink,

}