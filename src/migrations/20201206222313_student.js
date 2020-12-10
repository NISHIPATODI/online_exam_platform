exports.up = function(knex) {
    return knex.schema.createTable("student",function(table){
        table.uuid("studentId").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table.string("fullName");
        table.string("userType");
        table.string("year");
        table.string("branch");
        table.string("section");
        table.string("enrolment");
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.timestamps(false, true);

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("student");
};
