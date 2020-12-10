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
  const Test = require("../../models/testInfoModel");
  
  
  const GetPaper = async (req, res) => {
    let { year,branch,section } = req.body;
  
    const [unsaved, saved] = await to(
      Test.query().select().where("year",year).andWhere("branch",branch).andWhere("section",section).orderBy("createdAt").firstOne()
        .withGraphFetched("TestQuestions(question).QuestionOption(options)")
        .modifiers({
          question(builder) {
            builder.select("question");
          },
          options(builder) {
            builder.select("option_A","option_B","option_C","option_D");
          },
        
        }).returning("*")
        
    )

    console.log(saved);
  if (unsaved) return badRequestError(res, "unable to fetch paper");
  return okResponse(res, saved, "paper fetched");

    }
    module.exports = {
        GetPaper }