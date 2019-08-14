module.exports = dynamoose => {
    const shortid = require('shortid');
    const schema = new dynamoose.Schema({
        id: {
            type: String,
            default: shortid.generate,
            hashKey: true
        },
        name: { type: String },
        icon: { type: String },
    })

    return dynamoose.model('Item', schema);
}