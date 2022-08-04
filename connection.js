const mongoose = require('mongoose')
// const { mongodb } = require('./config')
require('dotenv').config()

// const connection = mongoose.connect(`mongodb://${mongodb.host}:${mongodb.port}/${mongodb.database}`)
const connection = mongoose.connect(`mongodb+srv://Jairmartinez23:Jairmartinez23@cluster0.ls7su.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('Nos fuimos')
}).catch( err => {
    console.log('Conexion inexitosa' + err)
})

module.exports = connection 
