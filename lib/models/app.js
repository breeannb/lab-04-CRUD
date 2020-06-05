// POST /resources
// GET /resources
// GET /resources/:id
// PATCH /resources/:id
// DELETE /resources/:id

//express lets us do the post/get/etc. 
// patch updates something 

const express = require('express'); 
const app = express(); 
const Shareable = require('./Shareable');

app.use(require('cors')());
app.use(express.json());

app.post('/shareables', (req, res) => {
    Shareable
        .create(req.body)
        .then(shareable => res.send(shareable));
});

app.get('/shareables', (req, res) => {
    Shareable
        .find()
        .then(shareables => res.send(shareables));
});

app.get('/shareables/:id', (req, res) => {
    // console.log(req.params.id);
    Shareable   
        .findById(req.params.id)
        .then(shareable => res.send(shareable)); 
});

//grabbing object by id and it is updating the item
//in one test, can you let it get by id and update the list
//
app.patch('/shareables/:id', (req, res) => {
    Shareable 
        .findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(shareable => res.send(shareable));
});

app.delete('/shareable/:id', (req, res) => {
    Shareable
        .findById(req.params.id)
        .then(shareable => res.send(shareable));
});

module.exports = app;

//findByIdAndDelete
