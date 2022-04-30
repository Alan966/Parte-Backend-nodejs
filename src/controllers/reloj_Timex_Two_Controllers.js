const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); 

const relojesTimexTwo = require('../models/relojesTimexTwoModel'); 

const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'; 
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'; 

    relojesTimexTwo.find()
    .select("-photo")
    .sort([[sortBy,order]])
    .exec((err, relojesTimexTwo) => {
        if(err){
            return res.status(400).json({
                error: "RelojesTimexTwo no encontrado"
            })
        }
        res.json(relojesTimexTwo)
    })
}

const read = (req, res) => {
    req.relojestimextwo.photo = undefined; 
    return res.json(req.relojestimextwo);
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
        
        const { name } = fields; 
        let relojestimextwo = new relojesTimexTwo(fields); 

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image should be lass than 1MB in size"
                })
            }
            relojestimextwo.photo.data = fs.readFileSync(files.photo.filepath); 
            relojestimextwo.photo.contentType = files.photo.type; 
        }

        relojestimextwo.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: "Error al guardar el relojesTimexTwo" + err
                })
            }
            res.json(result);
        })
    })
}

const remove = (req, res) => {
    let relojestimextwo = req.relojestimextwo; 
    relojestimextwo.remove((err, deletedRelojesTimexTwo) => {
        if(err){
            return res.status(400).json({
                error: "Error al eliminar el relojesTimexTwo" + err
            })
        }
        res.json({
            message: "RelojesTimexTwo was deleted successfully"
        })
    })
}

const relojesHomeTwoId = (req, res, next, id) => {
    relojesTimexTwo.findById(id)
    .exec((err, relojestimextwo) => {
        if(err){
            return res.status(400).json({
                error: "RelojesTimexTwo no encontrados"
            })
        }
        req.relojestimextwo = relojestimextwo; 
        next();
    })
}

const photo = (req, res, next) => {
    if(req.relojestimextwo.photo.data){
        res.set('Content-Type', req.relojestimextwo.photo.contentType)
        return res.send(req.relojestimextwo.photo.data)
    }
    next();
}

module.exports = {
    list, 
    read, 
    create, 
    remove, 
    relojesHomeTwoId, 
    photo
}