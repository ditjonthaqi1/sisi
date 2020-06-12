const mongose = require('mongoose')
const {Schema} = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const roomSchema = new Schema({
    RoomID: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: false,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw Error('EMAIL_INVALID')
        }
    },
    type: {
        type: Number,
        require:true
    },
    time: {
        type: Number,
        default: Math.floor(Date.now()/60000)
    }
})



const Room = mongose.model('Room', roomSchema) 

roomSchema.methods.addRoom = (room) => {
    console.log(room)
    new Room(room).save((err) => { 
        console.log(err)
    })
}

roomSchema.methods.findUsersInRoom = (id) => {
    console.log("Room ID:", id);
    return new Promise((resolve, reject) =>{
        Room.find({RoomID:id}, (err, docs) => {
            if(!err && docs.length != 0){
                resolve(docs)
            }else{
                reject("ELTI")
            }
        })
    })
}

module.exports = roomSchema;

