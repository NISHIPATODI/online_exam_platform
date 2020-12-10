
// questionPaper Model 

const { Model } = require('objection');

class QPaper extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'qPaper';
  }

  static get relationMappings(){
    const QOption=require("./qOptionModel");
    
    return{
      QuestionOption:{
        relation:Model.HasOneRelation,
        modelClass:QOption,
        join:{
          from:"qPaper.quesId",
          to:"qOption.quesId"
        }
      },



    }

    

}
 
 
}
  
    
  

module.exports = QPaper;