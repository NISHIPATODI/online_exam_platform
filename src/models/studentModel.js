const { Model } = require('objection');

class Student extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'student';
  }
  static get relationMappings(){
    const AnsTable=require("./ansTableModel");
    
    return{
      studAns:{
        relation:Model.BelongsToOneRelation,
        modelClass:AnsTable,
        join:{
          from:"student.studentId",
          to:"ansTable.studentId"
          
        }
      },



    }
  }
 
  }

    module.exports=Student;