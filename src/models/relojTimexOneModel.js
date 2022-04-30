const mongoose = require('mongoose')

const relojTimexOneModel = new mongoose.Schema(
    {
        name:{
            type: String,
            trim: true,
            require: true, 
            maxLength:32
        }, 
        description:{
            type: String,
            trim: true,
            require: true,
            maxLength: 2000
        }, 
        photo:{
            data: Buffer,
            contentType: String
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model("relojTimexOne", relojTimexOneModel)