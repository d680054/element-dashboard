module.exports = app => {
    // const mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost:27017/element-admin', {
    //     useNewUrlParser: true,
    //     useFindAndModify: true,
    //     useCreateIndex: true,
    // });

    const dynamoose = require('dynamoose');
    dynamoose.AWS.config.update({
        region: 'eu-west-1',
    });
    dynamoose.local('http://localhost:8000');
    dynamoose.setDefaults({ update: true });
    return dynamoose;
}