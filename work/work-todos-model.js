const db = require('../data/dbConfig');

module.exports = {
    getTodoList,
    addTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}

function getTodoList() {
    return db('work');
}

function getTodoById(id) {
    return db('work')
        .where({ id })
        .first();
}

function addTodo(todo) {
    return db('work')
        .insert(todo, 'id')
        .then(([id]) => {
            return getTodoById(id);
        })
}

function updateTodo(id, changes) {
    return db('work')
        .where({ id })
        .update(changes);
}

function deleteTodo(id) {
    return db('work')
        .where({ id })
        .del();
}