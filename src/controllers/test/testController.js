const {
    okResponse,
    badRequestError,
    to,
    unverifiedError,
    loginResponse,
  } = require("../../../global_functions");
const AnsTable = require("../../models/ansTableModel");
const Test = require("../../models/testInfoModel");
const Qpaper = require("../../models/qPaperModel")




  const TestQuestion = async (req, res) => {

   let body=req.body;

   console.log(body);
   console.log(body.year);

    let [err, test_question] = await to(
        Test.query().insertGraph({
            year: body.year,
            branch: body.branch,
            section: body.section,
            subject: body.subject,
            startTime: body.startTime,
            date: body.date,
            duration: body.duration,

          
            TestQuestions: [
              {
                question: body.question,
                paperType: body.paperType,
                answer: body.answer,
          
                QuestionOption: [
                  {
                    option_A: body.option_A,
                    option_B: body.option_B,
                    option_C: body.option_C,
                    option_D: body.option_D,
                  }
                ]
              }
            ]
          }).returning("*")
        
      );
      if (err) badRequestError(res, "unable to insert data");
    
      //delete user_inserted.password;
      console.log("test detail ", test_question);
      return okResponse(res, test_question,"test's Questions inserted successfully");
     
     // return okResponse(res,"user record fetched successfully");
     
  
}


module.exports = {

    TestQuestion,

}
