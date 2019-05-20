const db = require('../data/dbConfig');

module.exports = {
    getTodoList,
    addTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}

function getTodoList() {
    return db('household');
}

function getTodoById(id) {
    return db('household')
        .where({ id })
        .first();
}

function addTodo(todo) {
    return db('household')
        .insert(todo, 'id')
        .then(([id]) => {
            return getTodoById(id);
        })
}

function updateTodo(id, changes) {
    return db('household')
        .where({ id })
        .update(changes);
}

function deleteTodo(id) {
    return db('household')
        .where({ id })
        .del();
}