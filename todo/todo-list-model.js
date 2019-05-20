const db = require('../data/dbConfig');

module.exports = {
    getTodoList,
    addTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}

function getTodoList() {
    return db('todo');
}

function getTodoById(id) {
    return db('todo')
        .where({ id })
        .first();
}

function addTodo() {
    return db('todo')
        .insert(todo, 'id')
        .then(([id]) => {
            return getTodoById(id);
        })
}

function updateTodo(id, changes) {
    return db('todo')
        .where({ id })
        .update(changes);
}

function deleteTodo(id) {
    return db('todo')
        .where({ id })
        .del();
}