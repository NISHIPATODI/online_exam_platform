
// User Model 

const { Model } = require('objection');

class AnsTable extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'ansTable';
  }
  static get relationMappings(){
    const Student=require("./studentModel");
   
    return{
        //Donations on requiremnets
      studDetails:{
        relation:Model.BelongsToOneRelation,
        modelClass:Student,
        join:{
          from:"ansTable.studentId",
          to:"student.studentId"
        }
      },

      quesDetails:{
        relation:Model.BelongsToOneRelation,
        modelClass:Student,
        join:{
          from:"ansTable.quesId",
          to:"qPaper.quesId"
        }
      },


      
    }
  }
 
 
    }
  

module.exports =AnsTable;