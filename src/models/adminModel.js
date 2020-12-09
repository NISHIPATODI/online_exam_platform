
// User Model 

const { Model } = require('objection');

class Admin extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'admin';
  }
 
  static get relationMappings(){
   
    

}
}
  
    
  

module.exports = Admin;