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
    console.log(req.params.id);
    Shareable   
        .findById(req.params.id)
        .then(shareables => res.send(shareables)); 
});


module.exports = app;
