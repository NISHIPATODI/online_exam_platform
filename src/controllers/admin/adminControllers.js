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
      
      var mailOptions = {
        from: "nishi.patodi@gmail.com",
        to: 'patodi.nishi@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy and fun learning!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      


}

module.exports = {
    Invitelink,

}