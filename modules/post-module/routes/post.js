const express = require('express');
const router= express.Router();
const postController = require('../controller/postController');
const passportSetting = require('../../../core/settings/passport');

//API Post

router.get('/', postController.getPosts);
router.get('/myposts', passportSetting.verifyToken, postController.getPostsOfUser);

router.get('/:id', postController.getPost);
router.post('/', passportSetting.verifyToken, postController.postPost);
router.put('/:id', passportSetting.verifyToken, postController.checkPostAuth, postController.putPost);

router.delete('/:id',passportSetting.verifyToken, postController.checkPostAuth, postController.deletePost);

module.exports = router;
