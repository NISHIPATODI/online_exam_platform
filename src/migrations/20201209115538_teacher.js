
exports.up = function(knex) {
    return knex.schema.createTable("teacher",function(table){
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table.string("fullName");
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.string("userType");
         
        table.timestamps(false, true);
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("teacher");
};
