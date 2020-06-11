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
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value))
                throw Error('EMAIL_INVALID')
        }
    },
    userID: {
        type: Number,
        require:true
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
    new Room(room).save(() => { 
        console.log(room)
    }) 
}

 module.exports = roomSchema;

