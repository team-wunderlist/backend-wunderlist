const db = require('../data/dbConfig');

module.exports = {
    getTodoList,
    addTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}

function getTodoList() {
    return db('grocery');
}

function getTodoById(id) {
    return db('grocery')
        .where({ id })
        .first();
}

function addTodo(todo) {
    return db('grocery')
        .insert(todo, 'id')
        .then(([id]) => {
            return getTodoById(id);
        })
}

function updateTodo(id, changes) {
    return db('grocery')
        .where({ id })
        .update(changes);
}

function deleteTodo(id) {
    return db('grocery')
        .where({ id })
        .del();
}