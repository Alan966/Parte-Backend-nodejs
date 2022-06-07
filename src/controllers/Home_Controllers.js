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
    .exec((err, HomeModel) => {
        if(err){
            return res.status(400).json({
                error: "Image de Home no encontrado" + err
            })
        }
        res.json(HomeModel);
    })
}

const read = (req, res) => {
    req.homemodel.photo = undefined; 
    return res.json(req.homemodel);
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
        let homemodel = new HomeModel(fields);

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error:"Image should be less than 1MB in size"
                })
            }
            homemodel.photo.data = fs.readFileSync(files.photo.filepath); 
            homemodel.photo.contentType = files.photo.type;
        }

        homemodel.save((err, result) => {
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
    let homemodel = req.homemodel; 
    homemodel.remove((err, deletedHomeModel) => {
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
    .exec((err, homemodel) => {
        if(err){
            return res.status(400).json({
                error: "Home no encontrado"
            })
        }
        req.homemodel = homemodel;
        next();
    })
}

const photo = (req, res, next) => {
    if(req.homemodel.photo.data){
        res.set('Content-Type', req.homemodel.photo.contentType)
        return res.send(req.homemodel.photo.data)
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