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
  
  const validator = require("validator");
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  

  const SignUp = async (req, res) => {
    console.log(req.body);
    if(req.body.userType==="admin")
    let { email, password, userType,institute } = req.body;
  
    if (!validator.isEmail(email || ""))
      return badRequestError(res, "Enter a valid email address");
    if (password === "") return badRequestError(res, "password can not be empty");
  
    let [error, result] = await to(Admin.query().where("email", email).first());
    if (error) console.log(error);
    if (result) {
      console.log(result);
      return badRequestError(res, " email already exists");
    }
  
    password = await bcrypt.hash(password, 10); //hashing password on validating email and pass
  
   
    //inserting user details
    let [err, user_inserted] = await to(
      Admin.query()
        .insert({ email:email, password:password, accHash:accHash, fullName:fullName })
        .returning("*")
    );
    if (err) badRequestError(res, "unable to insert user");
  
    //sending token through mailgun api
    /*sendMail(email, `OTP ${otp}`);*/
    //returning response on insertion
    delete user_inserted.password;
    console.log("USER's detail ", user_inserted);
    return okResponse(res, "user inserted successfully");
  };
  
 
  

  //Login User
  
  const Login = async (req, res) => {
    let access_token;
    console.log(req.body);
    let { email, password } = req.body;
    if (!validator.isEmail(email || ""))
      return badRequestError(res, "Enter a valid email address ");
    if (password === "") return unverifiedError(res, "password field is empty");
    let [incorrect, user_returned] = await to(
      Users.query().findOne("email", email).throwIfNotFound()
    );
  console.log("user_returned  "+user_returned.accHash)
    if (incorrect) return badRequestError(res, "email does not exists");
  
    //Checking whether email is verified
    if (user_returned.email === email) {
      //checking password
      if (await bcrypt.compare(password, user_returned.password)) {
        //Generating JWT token on correct password for USER type
  
        
         access_token = await jwt.sign(
          { email, id: user_returned.id,accHash:user_returned.accHash },
          process.env.JWT_USER_SECRET,
          {
            expiresIn: "24h",
          }
        );
             
        res.setHeader("Authorization", access_token);
        res.setHeader("access-control-expose-headers", "authorization");
  
        delete user_returned.password;
        return okResponse(res,user_returned,"loged in successfully");
      }
      //Error returned when password is invalid
      return unverifiedError(res, "invalid password");
    }
  
}


  // Change user password
  const ChangePassword = async (req, res) => {
    let { new_password, old_password,email } = req.body;
    if (!email) return badRequestError(res, "email field is empty");
    if (!new_password || !old_password)
      return badRequestError(res, "password field is empty");
  
    let [error, user_detail] = await to(
      Users.query()
        .findOne("email", email)
        .returning("password")
        .throwIfNotFound()
    );
    if (user_detail) {
      //checking old password entered by user
      if (await bcrypt.compare(old_password, user_detail.password)) {
        //if matched then hashing new password
        let new_hashed_password = await bcrypt.hash(new_password, 10);
        let [err, password_updated] = await to(
          Users.query()
            .where("email", email)
            .update({ password: new_hashed_password })
            .throwIfNotFound()
        );
        if (password_updated)
          return okResponse(res, undefined, "password changed successfully");
      } else {
        return badRequestError(res, "old password did not match");
      }
    }
  };
  
  //ignore only for testing
  
  const Delete = async (req, res) => {
    let {id}=req.body;
    let [error, deleted] = await to(Users.query().where("id",id).delete().throwIfNotFound());
    if (error) badRequestError(res, "unable to delete");
    okResponse(res, deleted, "delete successfull");
  };
  
  module.exports = {
    SignUp,
    Delete,
    Login,
    ChangePassword,
      };
  