
// Test Model 

const { Model } = require('objection');

class Test extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'testInfo';
  }
 
  static get relationMappings(){
    const QPaper=require("./qPaperModel");
    
    return{
      TestQuestions:{
        relation:Model.HasManyRelation,
        modelClass:QPaper,
        join:{
          from:"testInfo.testId",
          to:"qPaper.testId"
        }
      },



    }

    

}
}
  
    
  

module.exports = Test;