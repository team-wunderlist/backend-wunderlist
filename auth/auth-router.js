const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../auth/auth-model');

// Import Secrets

const secrets = require('../config/secrets');

// Register New User

router.post('/register', (req, res) => {
    const user = req.body;

    if(!user.username || !user.password) {
        res.status(400).json({ errorMessage: 'New users require a username and password.' })
    } else {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.addUser(user)
            .then(saved => {
                const token = generateToken(saved);
                res.status(200).json({token})
            })
            .catch(err => {
                res.status(500).json({ error: err, message: 'This username is already taken.' })
            })
    }
})

// Login

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findUser({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}!`, token})
            } else {
                res.status(401).json({ errorMessage: 'Invalid credentials.' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'There was an error logging in.' })
        })
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '24hr'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

// Testing

router.get('/users', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Users could not be retrieved.' })
        })
})

module.exports = router;