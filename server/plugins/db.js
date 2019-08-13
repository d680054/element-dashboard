module.exports = app => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/element-admin', {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
    });
}