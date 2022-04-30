const formidable = require('formidable')
const _ = require('lodash'); 
const fs = require('fs'); 

const SliderShow = require('../models/SliderShowModels')

const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sartBy ? req.query.sortBy : 'name'

    SliderShow.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, slidershow) => {
        if(err){
            return res.status(400).json({
                error: "SliderShow no encontrado"
            })
        }
        res.json(slidershow)
    })
}

const read = (req, res) => {
    req.slidershow.photo = undefined;
    return res.json(req.slidershow); 
}

const create = (req, res) => {
    let form = new formidable.IncomingForm() 
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Error al subir la imagen"
            })
        }

        const { name, description } = fields
        let slidershow = new SliderShow(fields); 

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "La imagen es muy pesada"
                })
            }
            slidershow.photo.data = fs.readFileSync(files.photo.filepath)
            slidershow.photo.contentType = files.photo.type
        }

        slidershow.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: "Error al guardar el SliderShow" + err
                })
            }
            res.json(result);
        })

    })
}

const remove = (req, res) => {
    let slidershow = req.slidershow; 
    slidershow.remove((err, slidershow) => {
        if(err){
            return res.status(400).json({
                error: "Error al eliminar el SliderShow"
            })
        }
        res.json({
            message: "SliderShow eliminado"
        })
    })
}

const slidershowId = (req, res, next, id) => {
    SliderShow.findById(id)
    .exec((err, slidershow) => {
        if(err || !slidershow){
            return res.status(400).json({
                error: "SliderShow no encontrado"
            })
        }
        req.slidershow = slidershow;
        next()
    })
}

const photo = (req, res, next) => {
    if(req.slidershow.photo.data){
        res.set('Content-Type', req.slidershow.photo.contentType)
        return res.send(req.slidershow.photo.data)
    }
    next();
}

module.exports = { 
    list, 
    read, 
    create, 
    remove, 
    slidershowId, 
    photo }