exports.up = function(knex, Promise) {
    return knex.schema.createTable('household', tbl => {
        tbl.increments();
        tbl
            .text('item', 128)
            .notNullable();
        tbl
            .text('description');
        tbl
            .integer('priority');
        tbl
            .date('due_date');
        // tbl
        //     .integer('user_id')
        //     .unsigned()
        //     .notNullable()
        //     .references('id')
        //     .inTable('users')
        //     .onDelete('RESTRICT')
        //     .onUpdate('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('household');
};