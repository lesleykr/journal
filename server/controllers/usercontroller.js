const router = require('express').Router(); //import the Express framework and chain to the Router() method, assigning it to a variable called router.
const User = require('../db').import('../models/user'); //import the db.js (Sequelize) file and chain to access the user model, assigning it to a variable called User.
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const Login = require('../db').import('../models/login');

router.post('/create', function(req, res) {
                                        
    User.create({                    
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13) 
    })                               
    .then(                  
        function createSuccess(user) { 
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        
            res.json({
                user: user,
                message: 'User successfully created!',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err}))
});


//login route
router.post('/login', function(req, res) {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(
        function loginSuccess(user) {           
        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                    res.status(200).json({
                        user: user,
                        message: 'User successfully logged in!',
                        sessionToken: token

                })
            } else {
                res.status(502).send({error: "Login Failed"});
            }
            });       
            
        } else {
            res.status(500).json({ error: 'User does not exist.'})
        }
        })
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router; //export the module for usage outside of the file.