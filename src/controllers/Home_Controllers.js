const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const HomeModel = require("../models/Home_model"); 

const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'; 
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name';

    HomeModel.find()
    .select("-photo")
    .sort([[sortBy, order]])
    .exec((err, imageHome) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json(imageHome);
    })
}

const read = (req, res) => {
    req.imageHome.photo = undefined; 
    return res.json(req.imageHome);
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
        const { name, description } = fields;
        let imageHome = new HomeModel(fields);

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Image should be less than 1MB in size"
                })
            }
            imageHome.photo.data = fs.readFileSync(files.photo.filepath); 
            imageHome.photo.contentType = files.photo.type;
        }

        imageHome.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: "Error al guardar el Home" + err
                })
            }
            res.json(result)
        })
    })
}

const remove = (req, res ) => {
    let imageHome = req.imageHome; 
    imageHome.remove((err, deletedImageHome) => {
        if(err){
            return res.status(400).json({
                error: "Error al eliminar el Home" + err
            })
        }
        res.json({
            message: "Home eliminado"
        })
    })
}

const ImageHomeById = (req, res, next, id) => {
    HomeModel.findById(id)
    .exec((err, imageHome) => {
        if(err){
            return res.status(400).json({
                error: "Home no encontrado"
            })
        }
        req.imageHome = imageHome;
        next();
    })
}

const photo = (req, res, next) => {
    if(req.imageHome.photo.data){
        res.set('Content-Type', req,imageHome.photo.contentType)
        return res.send(req.imageHome.photo.data)
    }
    next()
}

module.exports = {
    list,
    create,
    remove,
    read,
    ImageHomeById,
    photo
}