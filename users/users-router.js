const router = require('express').Router();

const Users = require('../auth/auth-model');

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'Could not retrieve users.' })
        })
})

module.exports = router;