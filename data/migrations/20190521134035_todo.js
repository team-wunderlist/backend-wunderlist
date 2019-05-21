exports.up = function(knex, Promise) {
    return knex.schema.createTable('todo', tbl => {
        tbl.increments();
        tbl
            .string('item', 128)
            .notNullable();
        tbl
            .text('description');
        tbl
            .integer('priority');
        tbl
            .date('due_date');
        tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('SET NULL')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('todo');
};