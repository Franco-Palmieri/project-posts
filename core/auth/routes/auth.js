const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')

const passportSetting = require('../../settings/passport')


//API AUTH USER

router.post('/signup', auth.postSignup)
router.post('/login', auth.postLogin)

router.get('/logout', passportSetting.isAuth, auth.logout)


router.get('/userInfo', passportSetting.isAuth, (req, res)=>{
    res.json({
        message: 'Queste sono le tue info',
        user: req.user,
    })
})

module.exports = router