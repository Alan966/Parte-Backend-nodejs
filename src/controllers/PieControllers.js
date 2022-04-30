const Pie = require('../models/pieModel');

const list = (req, res) => {
    Pie.find().exec((err, data) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        res.json(data)
    })
}

const create = (req, res) => {
    const pie = new Pie(req.body); 
    pie.save((err, data) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({data})
    })
}

const remove = (req, res) => {
    let pie = req.pie; 
    pie.remove((err, data) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        res.json({data})
    })
}

const pieId = (req, res, next, id) => {
    Pie.findById(id).exec((err, pie) => {
        if(err || !pie){
            return res.status(400).json({
                error: "Pie not found"
            })
        }
        req.pie = pie;
        next();
    })
}

module.exports = {
    list, 
    create, 
    remove,
    pieId
}