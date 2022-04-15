const passport = require('passport')
const User = require('../../../modules/user-module/model/User')
const jwt = require('jsonwebtoken')


exports.postSignup = (req, res, next) =>{

    const new_user = new User ({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password
    })

    User.findOne({email: req.body.email}, (err, userExist)=>{

        if(userExist){
            return res.status(400).send('Questa email è già stata registrata')
        }
        
        new_user.save((err)=>{
            if(err){
                next(err)
            }
            req.logIn(new_user, (err)=>{
                if(err){
                    next(err)
                }
                res.send("L'utente è stato creato")
            })
        })
    })
}

exports.postLogin = (req, res, next) => {
    
    passport.authenticate('local', (err, user, info)=>{
        
        if(err){
            next(err)
        }
        if(!user){
            return res.status(400).send('Email o Password non valida')
        }
        req.logIn(user, (err)=>{
            if(err){
                next(err);
            }
            //res.send('Login effettuato con successo')
            const body = {_id: user._id, email: user.email}
            const token = jwt.sign({ user: body }, 'TOP_SECRET');
            return res.json({ token });
        })
    })(req, res, next);
}

exports.logout = (req, res) => {
    req.logout()
    res.send('Logout effettuato con successo')
}