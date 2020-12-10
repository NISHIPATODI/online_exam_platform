const {
    okResponse,
    badRequestError,
    to,
    unverifiedError,
    loginResponse,
  } = require("../../../global_functions");
const AnsTable = require("../../models/ansTableModel");




  const StudentAnswer = async (req, res) => {
    //console.log(req.body);
   let id= req.user.studentId;
   let quesId=req.body.quesId;
   let answer=req.body.answer;

   console.log(studentId);
   console.log(quesId);
   console.log(answer);
  
    let [err, student_answer] = await to(
        AnsTable.insert({ studentId:studentId, quesId:quesId, answer:answer })
        .returning("*")
        
      );
      if (err) badRequestError(res, "unable to insert data");
    
      //delete user_inserted.password;
      console.log("USER's detail ", student_answer);
      return okResponse(res, student_answer,"Student's answers inserted successfully");
     
     // return okResponse(res,"user record fetched successfully");
     
  
}


module.exports = {
    
    StudentAnswer  

}
