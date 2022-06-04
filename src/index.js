const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const connection = require('../connection')
const SubMenu_one = require('./routes/SubMenu_one')
const SubMenu_two = require('./routes/SubMenu_two')
const SubMenu_three = require('./routes/SubMenu_three')
const Image_Menu = require('./routes/Image_Menu')
const Slider_show = require('./routes/SlidershowRoutes')
const relojTimexOne = require('./routes/relojTimexOne')
const relojTimexTwo = require('./routes/RelojesHomeTwo')
const pie = require('./routes/pie')
const pieSecond = require('./routes/pieSecond')
const Home = require('./routes/Home')

const cors = require('cors')
const { response } = require('express')

const app = express(); 
require('dotenv').config() 

//settings 
app.set('title', 'Aplicacion hecha en Node Js')
app.set('port', process.env.PORT || 5000)

//Middlewares 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
    response.send('<h1> Servidor con express </h1>')
})

//Rutas 
app.use('/submenu/one', SubMenu_one)
app.use('/submenu/two', SubMenu_two)
app.use('/submenu/three', SubMenu_three)
app.use('/image', Image_Menu)
app.use('/slider', Slider_show)
app.use('/relojesTimexOne', relojTimexOne)
app.use('/relojesTimexTwo', relojTimexTwo)
app.use('/pie', pie)
app.use('/pieSecond', pieSecond)
app.use('/home', Home)

app.listen(app.get('port'), () => {
    console.log('Mi '+ app.get('title') + 'esta corriendo en el puerto ' + app.get('port'))
})