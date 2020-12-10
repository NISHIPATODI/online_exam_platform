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
    if(req.body.userType==="admin"){
    let { email, password, userType,institute,fullName } = req.body;
  
    if (!validator.isEmail(email || ""))
      return badRequestError(res, "Enter a valid email address");
    if (password === "") return badRequestError(res, "password can not be empty");
  
    let [error, result] = await to(Admin.query().where("email", email).first());
    if (error) console.log(error);
    if (result) {
      console.log(result);
      return badRequestError(res, " email already exists");
    }
  
   // password = await bcrypt.hash(password, 10); //hashing password on validating email and pass
  
   
    //inserting user details
    let [err, user_inserted] = await to(
      Admin.query()
        .insert({ email:email, password:password, userType:userType, fullName:fullName,institue:institute })
        .returning("*")
    );
    if (err) badRequestError(res, "unable to insert user");
  
    delete user_inserted.password;
    console.log("USER's detail ", user_inserted);
    return okResponse(res, "user inserted successfully");
    }
else{
    if(req.body.userType==="student"||req.body.userType==="teacher"){
      let { email, password, userType,year,branch,section,fullName } = req.body;
    
      if (!validator.isEmail(email || ""))
        return badRequestError(res, "Enter a valid email address");
      if (password === "") return badRequestError(res, "password can not be empty");
    
      let [error, result] = await to(  Student.query().where("email", email).first());
      if (error) console.log(error);
      if (result) {
        console.log(result);
        return badRequestError(res, " email already exists");
      }
    
      //password = await bcrypt.hash(password, 10); //hashing password on validating email and pass
    
     
      //inserting user details
      let [err, user_inserted] = await to(
       Student.query()
          .insert({ email:email, password:password, userType:userType, fullName:fullName,year:year,branch:branch,section:section })
          .returning("*")
      );
      if (err) badRequestError(res, "unable to insert user");
    
      delete user_inserted.password;
      console.log("USER's detail ", user_inserted);
      return okResponse(res, "user inserted successfully");
      }
    }
      
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
      Admin.query().findOne("email", email).throwIfNotFound()
    );
  console.log("user_returned  "+user_returned)
    if (incorrect) return badRequestError(res, "email does not exists");
  
    //Checking whether email is verified
      //checking password
      if (await bcrypt.compare(password, user_returned.password)) {
        //Generating JWT token on correct password for USER type
  
        if (user_returned.userType === "admin") {
    
         access_token = await jwt.sign(
          { email, adminId: user_returned.adminId,userType:user_returned.userType },
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

      else  {
    console.log(user_returned);
        access_token = await jwt.sign(
         { email, studentId: user_returned.studentId,userType:user_returned.userType },
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


const LoginStud = async (req, res) => {
  let access_token;
  console.log(req.body);
  let { email, password } = req.body;
  if (!validator.isEmail(email || ""))
    return badRequestError(res, "Enter a valid email address ");
  if (password === "") return unverifiedError(res, "password field is empty");
  let [incorrect, user_returned] = await to(
    Student.query().findOne("email", email).throwIfNotFound()
  );
console.log("user_returned  "+user_returned)
  if (incorrect) return badRequestError(res, "email does not exists");

  //Checking whether email is verified
    //checking password
    if (await bcrypt.compare(password, user_returned.password)) {
      //Generating JWT token on correct password for USER type

     
   // else  {
  console.log(user_returned);
      access_token = await jwt.sign(
       { email, studentId: user_returned.studentId,userType:user_returned.userType },
       process.env.JWT_USER_SECRET,
       {
         expiresIn: "24h",
       }
     );
          
     res.setHeader("Authorization", access_token);
     res.setHeader("access-control-expose-headers", "authorization");

     delete user_returned.password;
     return okResponse(res,user_returned,"loged in successfully");
  // }
    //Error returned when password is invalid
   // return unverifiedError(res, "invalid password");
  }

}

  // Change user password
  const ChangePassword = async (req, res) => {
    let { new_password, old_password,email } = req.body;
    if (!email) return badRequestError(res, "email field is empty");
    if (!new_password || !old_password)
      return badRequestError(res, "password field is empty");
  
    let [error, user_detail] = await to(
      Student.query()
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
    let {fullName,email}=req.body;
    let [error, deleted] = await to(Student.query().where("fullname",fullName).andWhere("email",email).delete().throwIfNotFound());
    if (error) badRequestError(res, "unable to delete");
    okResponse(res, deleted, "delete successfull");
  };
  
  module.exports = {
    SignUp,
    Delete,
    Login,
    ChangePassword,
    LoginStud
      };
  