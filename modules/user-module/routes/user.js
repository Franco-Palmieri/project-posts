const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

const passportSetting = require('../../../core/settings/passport')


//API User
router.get('/', userController.getUsers)
// router.get('/:id', userController.getUser); -> routes Auth (userInfo)

// router.post('/', userController.postUser) -> routes Auth (signup)
router.put('/', passportSetting.isAuth, userController.putUser)

router.delete('/',passportSetting.isAuth, userController.deleteUser) 

//Funzioni di prova di Arianna
router.post('/prova', userController.funzioneDiProva)

module.exports = router