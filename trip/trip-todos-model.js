const db = require('../data/dbConfig');

module.exports = {
    getTodoList,
    addTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}

function getTodoList() {
    return db('trip');
}

function getTodoById(id) {
    return db('trip')
        .where({ id })
        .first();
}

function addTodo(todo) {
    return db('trip')
        .insert(todo, 'id')
        .then(([id]) => {
            return getTodoById(id);
        })
}

function updateTodo(id, changes) {
    return db('trip')
        .where({ id })
        .update(changes);
}

function deleteTodo(id) {
    return db('trip')
        .where({ id })
        .del();
}