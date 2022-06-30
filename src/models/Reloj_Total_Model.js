const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const RelojModel = new Schema(
{
    name:{
        type: String,
        trim: true,
        require: true,
        maxLength: 200,
    }, 
    submenu:{
        type: String,
        trim: true,
        require: true,
        maxLength: 200,
    }, 
    submenutwo:{
        type: String,
        trim: true,
        require: true,
        maxLength: 200,
    }, 
    description:{
        type: String,
        trim: true,
        require: true,
        maxLength: 500,
        unique: true
    },
    price:{
        type: Number,
        trim: true,
        require: true,
        maxLength: 200,
    },
    principal:{
        type: String,
        trim: true,
        require: true,
        maxLength: 200,
    }, 
    photo:{
        data: Buffer,
        contentType: String
    }
}, 
    {timestamps: true}
)

module.exports = mongoose.model('RelojModel', RelojModel);