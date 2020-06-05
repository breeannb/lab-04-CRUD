const mongoose = require('mongoose');
const app = require('./lib/models/app.js');

mongoose.connect('mongodb://localhost:27017/shareables', {
    usedNewUrlParser: true, 
    useUnifiedTopology: true
});

app.listen(3000, () => {
    console.log('Started on 3000'); 
}); 
