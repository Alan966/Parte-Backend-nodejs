const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const relojesTimexTwoSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true, 
        maxLength:60
    }, 
    photo:{
        data: Buffer,
        contentType: String
    }
}, 
{timestamps:true}
)

module.exports = mongoose.model('relojesTimexTwo', relojesTimexTwoSchema)