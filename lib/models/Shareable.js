const mongoose = require('mongoose'); 

const schema = new mongoose.Schema({
    artist: {
        type: String,
        required: true
    }, 
    description: {
        type: String, 
        maxlength: 500 
    }, 
    views: {
        type: Number, 
        required: true, 
        min: 0, 
        default: 0
    }
});

module.exports = mongoose.model('Shareable', schema); 
