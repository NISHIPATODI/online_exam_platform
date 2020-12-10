exports.up = function(knex) {
    return knex.schema.createTable("testInfo",function(table){
        table.uuid("testId").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table.string("year"); 
        table.string("branch");
        table.string("section");
        table.string("subject");
        table.string("startTime");
        table.string("date");
        table.string("duration");
        
        table.timestamps(false, true);

    }).createTable("qPaper",function(table){
        table.uuid("testId").references("testId").inTable("testInfo").onDelete("CASCADE");
        table.uuid("quesId").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table.text('question');
        table.string("paperType");
        table.string("answer");

        table.timestamps(false,true);

    }).createTable("qOption",function(table){
        table.uuid("quesId").references("quesId").inTable("qPaper").onDelete("CASCADE");
        table.string("option_A");
        table.string('option_B');
        table.string("option_C");
        table.string("option_D");

        table.timestamps(false,true);
    })

    .createTable("ansTable",function(table){
        table.uuid("studentId").references("studentId").inTable("student").onDelete("CASCADE");
        table.uuid("quesId").references("quesId").inTable("qPaper").onDelete("CASCADE");
        table.string("answer");
          
         
        table.timestamps(false,true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("ansTable");
};
