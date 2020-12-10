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

  const InviteLink = async (req, res) => {
    console.log(req.body);
    //if(req.body.userType==="student")
    let { branch,year,section} = req.body;
    //coding_hustlers_vaibhav
    let [err, user_inserted] = await to(
        Student.query().select().where("year",year).andWhere("branch",branch).andWhere("section",section)
        .returning("*")
      );
      if (err) badRequestError(res, "unable to fetch user");
    
      //delete user_inserted.password;
      console.log("USER's detail ", user_inserted);
     // return okResponse(res, "user inserted successfully");
     
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nishi.patodi@gmail.com',

          pass: process.env.pwd
        }
      });
      let mail="sandeepsinghgour0@gmail.com";
      console.log("USER's detail indide mail function ", user_inserted.password);
     
      //let pwd=user_inserted.password
     // console.log("USER's detail indide mail function ",pwd);
     
      var mailOptions = {
        from: "nishi.patodi@gmail.com",
        to: mail,
        subject: 'Sending Email using Node.js',
        text: `password is ${user_inserted.password}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return okResponse(res, "mailSent succesfully");
     
        }
      });
      
//res.send("Mail sent")

}

const UserDetails = async (req, res) => {
    //console.log(req.body);
   let userType= req.params.id;
   console.log(req.params.id);
  
    let [err, user_record] = await to(
        Student.query().select().where("userType",userType)
        .returning("*")
      );
      if (err) badRequestError(res, "unable to fetch records data");
    
      //delete user_inserted.password;
      console.log("USER's detail ", user_record);
      return okResponse(res, user_record,"user record fetched successfully");
     
     // return okResponse(res,"user record fetched successfully");
     
  
}



module.exports = {
    InviteLink,
    UserDetails

}