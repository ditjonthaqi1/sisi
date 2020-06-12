const Room = require('../models/room')
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

class roomController {
    constructor() {
        
    }

    async createRoom(req,res) {
        const id = randomNr()
        req.body.RoomID = id;
        req.body.type = 1;
        Room.methods.addRoom(req.body)
        ids.push(id)
        ports.push(LAST_PORT)
        MeetPeople.push(1)
        fork("chat.js", [LAST_PORT+10, id]) 
        res.send({status:"OK", result:JSON.stringify({videoPort:LAST_PORT,audioPort:LAST_PORT+5 ,chatport:LAST_PORT+10 ,meetid:id, nrp:1})});
        console.log(ids, ports)
        LAST_PORT++
    }

    async attendanceCal(req, res){
        try{
            let emails = [];
            let timestaps = [];

            const docs = await Room.methods.findUsersInRoom(req.params.id)
            for(let i =0; i < docs.length; i++){
                const index = emails.indexOf(docs[i].email);
                if(index != -1){
                    timestaps[index].push(doc[i].time);
                }else{
                    emails.push(docs[i].email);
                    timestaps.push([docs[i].time]);
                }
            }
            const result = [];
            emails.forEach((item, i) =>{
                //[1,2,3,4]
                result.push({email:item, timestaps:timestaps[i].sort()})
            });
            console.log(result);

            
        } catch(e){
            //TODO return error
        }
        
    }

    async joinRoom(req,res) {
        
        const e = portFromId(parseInt(req.params.id));
        req.body.roomID = req.params.id;
        req.body.UserID = e[1];
        req.body.type = 1;
        Room.methods.addRoom(req.body);
        const result = JSON.stringify({videoPort:e[0],audioPort:e[2],chatport:e[3] ,meetid: parseInt(req.params.id) ,nrp: e[1] });
        res.send({status:"OK", result:result})
        
    }

    async leaveRoom(req, res) {
        console.log(req.body)
        const roomID = req.params.id
        req.body.roomID = roomID;
        req.body.type = 0;
        Room.methods.addRoom(req.body)
        res.send({status:"OK"})

    }


}

module.exports = roomController;