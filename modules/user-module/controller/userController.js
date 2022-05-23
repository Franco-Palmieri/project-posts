const User = require('../model/User')
const userService = require('../services/userService')();
// const {async} = require('rxjs')
const Post = require('../../post-module/model/Post')

exports.getUsers = async (req, res) => {
    
    try{
            
        let users = await User.find();
        res.json(users);
            
    }catch(err){

        console.log("c'è un errore", err);
            
    }
},

exports.postUser = async (req, res) => {
        
    try {
       let user = new User(req.body);
       await user.save();

        res.send(user);
        
    }catch (err){
        
        console.log("c'è un errore", err);
        
    }
}


exports.putUser = async (req, res) => {

    try{
        
        const new_user = {...req.body};
        let user = await User.findById(req.user.id);
      
        if(user){
            user = await User.findOneAndUpdate({_id: req.user.id}, new_user);
        }
        else {
            return res.status(404).json({
                message: 'User not Found'
            });
        }
        res.json(user);
        
    }catch(error){

        console.log("c'è un errore", error);

    }
}

exports.getUser = async(req, res) => {

    try {
       
        let user = await User.findById(req.params.id);
        res.json(user);

    }catch(error){

        console.log("c'è un errore", error);

    }
}

exports.deleteUser = async (req, res) => {
    try{
        
        let user = await User.findById(req.user.id);
  
        if(!user){
            console.log("Don't exist this user");
        }
        try{
            await User.findOneAndRemove({_id: user.id});
            await Post.collection.deleteMany({_userId: user.id});
        }catch (err){
            console.log(err);
            next(err);
        }

        res.json({msg: 'User Deleted'});

    }catch(error){
        console.log("c'è un errore", error);
    }
}


//Funzione di Arianna
exports.funzioneDiProva = async (req, res) => {

    try{
        let result = await userService.funzioneProva(req.body.par1, req.body.par2, req.body.agg, req.body.errore);

        res.json({msg: result}); //se result è undefined, restituisce {}
    }catch(error){
        res.json({msg: "Ti meriti una pausa", err: error});
    }
}