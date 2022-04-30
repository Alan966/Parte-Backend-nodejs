const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


const pie_Model = new Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        }
    }, 
    {timestamps: true}
)

module.exports = mongoose.model("Pie", pie_Model);