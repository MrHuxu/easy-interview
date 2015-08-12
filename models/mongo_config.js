var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/easy-interview');

module.exports = mongoose;