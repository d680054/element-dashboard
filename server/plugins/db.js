module.exports = app => {

    const AWS = require('aws-sdk');
    const dynamoose = require('dynamoose');
    const client = new AWS.DynamoDB();
    dynamoose.setDDB(client);

    if (process.env.IS_OFFLINE === 'true') {
        dynamoose.AWS.config.update({
            region: 'eu-west-1',
        });
        dynamoose.local('http://localhost:8000');
        dynamoose.setDefaults({ update: true });
    }
    return dynamoose;

    // const dynamoose = require('dynamoose');
    // dynamoose.AWS.config.update({
    //     region: 'eu-west-1',
    // });
    // dynamoose.local('http://localhost:8000');
    // dynamoose.setDefaults({ update: true });
    // return dynamoose;
}