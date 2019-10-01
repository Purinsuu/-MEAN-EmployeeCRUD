const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var mongoose = require('mongoose');

var {Employee} = require('../models/employee');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// => localhost:3000/employees/
router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        // ERROR CHECK IF EMPLOYEE NOT FOUND
        if(!err){res.send(docs);}
        else{console.log('Error in retrieving employees : '+ JSON.stringify(err, undefined, 2))}
    });
});
//READ
router.get('/:id', (req, res) => {
    // ERROR CHECK IF ID IS VALID
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}` );

    Employee.findById(req.params.id, (err, doc) => {
        if(!err){res.send(doc);}
        else{console.log('Error in retrieving employees : '+ JSON.stringify(err, undefined, 2))}
    });
});
// CREATE
router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, doc) => {
        if(!err) {res.send(doc);}
        else{console.log('Error in Employee Save : ' + JSON.stringify(err, undefined, 2));}
    });
});
// UPDATE
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}` );

        var emp = {
            name: req.body.name,
            position: req.body.position,
            office: req.body.office,
            salary: req.body.salary
        };
        Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {
            if(!err) {res.send(doc);}
            else{console.log('Error in Employee Save : ' + JSON.stringify(err, undefined, 2));}
        })
});
// DELETE
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}` );
    
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc);}
        else{console.log('Error in Employee Save : ' + JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;