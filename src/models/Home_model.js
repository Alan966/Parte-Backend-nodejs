const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeModel = new Schema(
    {
        name:{
            type: String,
            trim: true, 
            require: true,
            maxLength: 200,
        }, 
        description:{
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

module.exports = mongoose.model('HomeModel', HomeModel);