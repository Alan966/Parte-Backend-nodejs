const PieTwoSchema = require('../models/pieTwo_Models')

const create = (req, res) => {
    const pietwoschema = new PieTwoSchema(req.body)
    pietwoschema.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({data})
    })
}

const list = (req, res) => {
let order = req.query.order ? req.query.order : 'asc'; 
let sortBy = req.query.sortBy ? req.query.sortBy : 'name'; 

    PieTwoSchema.find() 
        .populate('pie')
        .sort([[sortBy, order]])
        .exec((err, data) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json(data);
        })
}

const remove = (req, res) => {
    let pietwoschema = req.pietwoschema; 
    pietwoschema.remove((err, deletedPieTwo) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Submenu two deleted successfully"
        })
    })
}

const PieTwoById = (req, res, next, id) => {
    PieTwoSchema.findById(id)
    .exec((err, pietwoschema) => {
        if(err || !pietwoschema){
            return res.status(400).json({
                error: "Pie two not found"
            })
        }
        req.pietwoschema = pietwoschema;
        next()
    })
}

module.exports = {
    list, 
    create, 
    remove, 
    PieTwoById
}