const formidable = require('formidable');
const _ = require('lodash'); 
const fs = require('fs'); 

const relojTimexOne = require('../models/relojTimexOneModel'); 

const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'; 
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'; 

    relojTimexOne.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, relojtimexone) => {
        if(err){
            return res.status(400).json({
                error: "RelojTimexOne no encontrado"
            })
        }
        res.json(relojtimexone)
    })
}

const read = (req, res) => {
    req.relojtimexone.photo = undefined; 
    return res.json(req.relojtimexone);
}

const create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; 
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Error al subir la imagen"
            })
        }

        const {name, description} = fields; 
        let relojtimexone = new relojTimexOne(fields);

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image should be lass than 1MB in size"
                })
            }
            relojtimexone.photo.data = fs.readFileSync(files.photo.filepath);
            relojtimexone.photo.contentType = files.photo.type;
        }

        relojtimexone.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: "Error al guardar el relojtimexone" + err
                })
            }
            res.json(result);
        })
    })
}

const remove = (req, res) => {
    let relojtimexone = req.relojtimexone; 
    relojtimexone.remove((err, deletedRelojtimexOne) => {
        if(err){
            return res.status(400).json({
                error: "Error al eliminar el relojtimexone" + err
            })
        }
        res.json({
            message: "RelojTimexOne was deleted successfully"
        })
    })
}

const relojTimexOneId = (req, res, next, id) => {
    relojTimexOne.findById(id)
    .exec((err, relojtimexone) => {
        if(err){
            return res.status(400).json({
                error: "RelojTimexOne no encontrado"
            })
        }
        req.relojtimexone = relojtimexone;
        next()
    })
}

const photo = (req, res, next) => {
    if(req.relojtimexone.photo.data){
        res.set('Content-Type', req.relojtimexone.photo.contentType)
        return res.send(req.relojtimexone.photo.data)
    }
    next()
}

module.exports = {
    list, 
    read, 
    create, 
    remove, 
    relojTimexOneId, 
    photo
}