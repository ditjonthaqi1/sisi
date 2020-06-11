const User = require('../models/user')
const {hash} = require('bcrypt')
const jwt = require("jsonwebtoken")
const { fork } = require('child_process');

//TODO Move Function to another file

const portFromId = (id) => {
    index = ids.indexOf(id)
    MeetPeople[index]++;
    return [ports[index],MeetPeople[index],ports[index]+5,ports[index]+10]
  }
  
  const roomId = () => {
      id = randomNr();
      if(ids.includes(id)){
        return roomId();
      }else {
        return id;
      }
  }
  
  const randomNr = () => {
    var min = 10000;
    var max = 99999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var ids = [];
var ports = []; 
var MeetPeople = [];


var LAST_PORT = 7070;
  
//</TODO>


//TODO change format of body req
class userController {
    constructor() {
        
    }
    
    async adduser (req,res) {
        try {
            await User.methods.findUser(req.body)
            const psw = await hash(req.body.password,8)
            req.body.password = psw
            User.methods.addUser(req.body)
            res.send({status:"OK"})
        } catch {
            res.send({status:"ERROR",error:"USER_EXISTS"})
        }
    }

    

    async loginUser(req,res) {
        console.log(req.body)
        try { 
            const user = await User.methods.login(req.body)
            const token = await jwt.sign({token:user['_id']},'qelsi')
            user.token = token
            await User.methods.updateToken(user)
            res.send({status:"OK",result:token})
        } catch(e){
            res.send({status:"ERROR",error:e})
        }
    }

    async logoutUser(req,res) {
        try {
            const user = req.body
            user.token = " "
            await User.methods.updateToken(user)
            res.send({status:"OK"})
        } catch(e){
            res.send({status:"ERROR",error:e})
        }
    }
    
    async createRoom(req,res) {
        const id = randomNr()
        ids.push(id)
        ports.push(LAST_PORT)
        MeetPeople.push(1)
        fork("chat.js", [LAST_PORT+10]) 
        res.send({status:"OK", result:JSON.stringify({videoPort:LAST_PORT,audioPort:LAST_PORT+5 ,chatport:LAST_PORT+10 ,meetid:id, nrp:1})});
        console.log(ids, ports)
        LAST_PORT++
    }

    async joinRoom(req,res) {
        const e = portFromId(parseInt(req.params.id));
        const result = JSON.stringify({videoPort:e[0],audioPort:e[2],chatport:e[3] ,meetid: parseInt(req.params.id) ,nrp: e[1] });
        res.send({status:"OK", result:result})
    }

    


}   

module.exports = userController