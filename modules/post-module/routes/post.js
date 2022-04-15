const express = require('express')
const router= express.Router()
const postController = require('../controller/postController')
const passportSetting = require('../../../core/settings/passport')

//API Post

router.get('/', postController.getPosts)
router.get('/:id', postController.getPost)

router.get('/myposts/:userId', postController.getPostsOfUser)

router.post('/:userId', passportSetting.isAuth, postController.postPost)
router.put('/:id/:userId', passportSetting.isAuth, postController.checkPostAuth, postController.putPost)

router.delete('/:id/:userId', postController.checkPostAuth, postController.deletePost)

module.exports = router