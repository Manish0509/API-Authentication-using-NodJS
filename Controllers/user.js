var express = require('express');
var app = express();
var fs = require("fs");
const { v4: uuidv4 } = require('uuid');     // this is used to create random id
const router = express.Router()
var utility = require('../Utility/utility')

var postlist = []

router.get('/', function (req, res) {
    fs.readFile(__dirname + "/../" + "post.json", 'utf8', function (err, data) {
        postlist = JSON.parse(data)
        var sameuser = postlist.filter(function (p){
            return p.createdBy==req.userId;
        })
            res.json(sameuser);
        })
});

router.post('/', function (req, res) {
    var newpost = req.body;
    newpost.createdAt = new Date();
    newpost.createdBy = req.userId   //encrypt the password entered by the user
    newpost.id = uuidv4();   // this will create unique id
    fs.readFile(__dirname + "/../" + "post.json", 'utf8', function (err, data) {
        postlist = JSON.parse(data);   // parse is converting Javascript object to JSON string
        postlist.push(newpost);
        fs.writeFile(__dirname + "/../" + "post.json", JSON.stringify(postlist), function (err, writtenbytes) {
            if (err) {
                console.log('Cant write to file');
            }
            else {
                console.log(' file has been written sucessfully');
            }
        })
        res.end(JSON.stringify(newpost));   //stringify is converting sting to object
    })
})

router.delete('/:id', function (req, res) {
    fs.readFile(__dirname + "/../" + "post.json", 'utf8', function (err, data) {
        postdelete = JSON.parse(data);
        filtered = postdelete.findIndex((y) => y.id == req.params.id && y.createdBy==req.userId);
        console.log(filtered)
        if (filtered == '-1') {
            return res.json({ msg: 'Invalid ID' })
        } else {
            postdelete.splice(filtered, 1)
            fs.writeFile(__dirname + "/../" + "post.json", JSON.stringify(postdelete), function (err, writtenbytes) {
                if (err) {
                    console.log('Cant delete to file');
                }
            })
            return res.json({ msg: 'deleted' })
        }
    });
});

router.get('/:id', function (req, res) {
    fs.readFile(__dirname + "/../" + "post.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);   // parse is converting Javascript object to JSON string
        var filtered = users.filter((x) => {
            return (x.id == req.params.id)
        });
        console.log(req.params.id, filtered)
        res.end(JSON.stringify(filtered));   //stringify is converting sting to object
    })
})

module.exports = router
