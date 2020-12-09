
// Teacher Model 

const { Model } = require('objection');

class Teacher extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'teacher';
  }
 
 
}
  
    
  

module.exports = Teacher;