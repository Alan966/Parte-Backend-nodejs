const formidable = require('formidable'); 
const _ = require('lodash');
const fs = require('fs');

const RelojModel = require("../models/Reloj_Total_Model"); 

const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'; 
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'; 

    RelojModel.find() 
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, RelojModel) => {
        if(err){
            return res.status(400).json({
                error: "Image de Reloj no encontrado" + err
            })
        }
        res.json(RelojModel);
    })
}

const read = (req, res) => {
    req.relojmodel.photo = undefined; 
    return res.json(req.relojmodel);
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
        const {name, description, principal, submenu, submenutwo, price} = fields; 
        const relojmodel = new RelojModel(fields); 

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image should be less than 1MB in size"
                })
            }
            relojmodel.photo.data = fs.readFileSync(files.photo.filepath); 
            relojmodel.photo.contentType = files.photo.type;
        }

        relojmodel.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: "Error al guardar el Reloj" + err
                })
            }
            res.json(result)
        })
    })
}

const remove = (req, res) => {
    let relojmodel = req.relojmodel;
    relojmodel.remove((err, deletedRelojModel) => {
        if(err){
            return res.status(400).json({
                error: "Error al eliminar el Reloj"+ err
            })
        }
        res.json({
            message: "Reloj eliminado"
        })
    })
}

const ImageRelojById = (req, res , next, id) => {
    RelojModel.findById(id)
    .exec((err, relojmodel) => {
        if(err){
            return res.status(400).json({
                error: "Image de Reloj no encontrado" + err
            })
        }
        req.relojmodel = relojmodel; 
        next();
    })
}

const photo = (req, res, next) => {
    if(req.relojmodel.photo.data){
        res.set('Content-Type', req.relojmodel.photo.contentType)
        return res.send(req.relojmodel.photo.data)
    }
    next();
}

module.exports = {
    list, 
    read, 
    create, 
    remove, 
    ImageRelojById, 
    photo
}