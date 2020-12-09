
// questionOptions Model 

const { Model } = require('objection');

class QOption extends Model {

  // Table name is the only required property.
  static get tableName() {
    return 'qOption';
  }
 
 
}
  
    
  

module.exports = QOption;