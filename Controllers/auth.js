const express = require('express');
const fs = require('fs')
const router = express.Router()
var utility = require('../utility/utility')

var users = []

router.post('/login', (req, res) => {
    //Authenticate user
    const email = req.body.email;
    const password = req.body.password;
    var filtered
    fs.readFile(__dirname + "/../" + "user.json", 'utf8', function (err, data) {
        users = JSON.parse(data)
        filtered = users.filter((x) => {
            return (x.email == email && utility.decrypt(x.password) == password)
        });
        if (filtered.length == 0) {
            return res.json({ msg: 'Unauthorised user' })
        }
        var Token = utility.JWTgenerateToken(filtered[0])
        return res.json({ Token: Token })
    })
})

module.exports = router
