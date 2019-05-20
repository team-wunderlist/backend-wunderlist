const db = require('../data/dbConfig');

module.exports = {
    getUsers,
    findUser,
    addUser,
    findUserById
}

function getUsers() {
    return db('users')
}

function findUser(username) {
    return db('users')
        .where(username)
}

async function addUser(user) {
    const [id] = await db('users').insert(user);
    return findUserById(id);
}

function findUserById(id) {
    return db('users')
        .where({ id })
        .first();
}