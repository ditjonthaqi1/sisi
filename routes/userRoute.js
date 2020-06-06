const router = require('express').Router()
const userController = require('../controllers/userController')
const User = require('../models/user')
const uc = new userController()


const midi = async (req,res,next) => {
    try {
        if(req.body.token){
            await User.methods.auth(req.body)
            next()
        }
       
    } catch(e) {
        res.send({status:"ERROR",error:e})
    }
}

router.post('/register',uc.adduser.bind(uc))
router.post('/login',uc.loginUser.bind(uc))
router.post('/logout',uc.logoutUser.bind(uc))
router.post('/create',midi,uc.createRoom.bind(uc))
module.exports = router