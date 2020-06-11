const router = require('express').Router()
const userController = require('../controllers/userController')
const User = require('../models/user')
const uc = new userController()


const midi = async (req,res,next) => {
    console.log(req.body);
    try {
        if(req.body.token){
            await User.methods.auth(req.body)
            next()
        }
       
    } catch(e) {
        res.send({status:"ERROR",error:e})
    }
}

//Maybe TODO -> get(where tokeni is as header)//
//createroom
//Authenticate: token

router.post('/register',uc.adduser.bind(uc))
router.post('/login',uc.loginUser.bind(uc))
router.post('/logout',midi,uc.logoutUser.bind(uc))
router.post('/createroom',midi,uc.createRoom.bind(uc))
router.post('/joinroom/:id',midi,uc.joinRoom.bind(uc))
router.post('/auth',midi, (req, res) => { res.send({status:"OK"})});
//router.post('/leaveroom/:id',midi,uc.leaveRoom.bind(uc))

module.exports = router