const SubMenuthree = require('../models/SubMenu_three_model');

const create = (req, res) => {
    const submenuthree = new SubMenuthree(req.body); 
    submenuthree.save((err, data) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        res.json({data})
    })
}

const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : 'name'

    SubMenuthree.find()
    .populate('submenutwo')
    .sort([[sortBy, order]])
    .exec((err, data) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }
        res.json(data);
    })
}

const remove = (req, res) => {
    let submenuthree = req.submenuthree 
    submenuthree.remove((err, deletedSubmenuThree) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'Submenu three deleted successfully'
        })
    })
}

const SubmenuthreeById = (req, res, next, id) => {
    SubMenuthree.findById(id)
    .exec((err, submenuthree) => {
        if(err || !submenuthree){
            return res.status(400).json({
                error: "Submenu three not found" + err
            })
        }
        req.submenuthree = submenuthree;
        next()
    })
}

module.exports = {
    create, 
    list, 
    remove, 
    SubmenuthreeById
}