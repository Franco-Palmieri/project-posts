const Post = require('../model/Post')
const auth = require('../../../core/auth/routes/auth')

exports.getPosts = async (req, res) => {

    try{

        let posts = await Post.find()
        res.json(posts)

    }catch(err){
        
        console.log("c'è un errore", error)

    }
}

exports.getPostsOfUser = async (req, res) =>{
  
    try{
        
        userId = req.params.userId
        let posts = await Post.find({_userId: userId})
        res.json(posts)

    }catch(err){
        console.log("C'è un errore", err)
    }
}

exports.postPost = async (req, res) => {

    try {
        
        let post = new Post(req.body)
        post._userId = req.params.userId
        await post.save()
        res.send(post)

    }catch (err){
        console.log("c'è un errore", err)
    }
}

//Controllo se il post sia stato creato dall'utente loggato
exports.checkPostAuth = async (req, res, next) =>{

    const currentUserId = req.params.userId
    
    Post.findById(req.params.id, (err, post) => {
        if(err){
            console.log(err)
            return next(err)
        }
        if(!post){
            return res.status(404).json({
                message: 'Post not Found'
            });
        }
        if(post._userId !== currentUserId){ 
            return res.status(401).json({
              message: 'Unauthorized'
            });
        }
        return next()
    })
}

exports.putPost = async (req, res) => {

    try{

        const new_post = {...req.body}
        let post = await Post.findById(req.params.id)

        if(!post){
            console.log("Don't exist this post")
        }
        post = await Post.findOneAndUpdate({_id: req.params.id}, new_post, {new: true})
        res.json(post)
        
    }catch(error){

        console.log("c'è un errore", error)

    }
}

exports.getPost = async(req, res) => {

    try {

        let post = await new Post.findById(req.params._id)
        res.json(post)

    }catch(error){

        console.log("c'è un errore", error)

    }
}

exports.deletePost = async (req, res) => {

    try{
        let post = await Post.findById(req.params.id)

        if(!post){
            console.log("Don't exist this post")
        }

        await Post.findOneAndRemove({_id: req.params.id})
        res.send('Post eliminato correttamente')

    }catch(err){

        console.log("c'è un errore", err)

    }
}

