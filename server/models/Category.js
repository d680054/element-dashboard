// const mongoose = require('mongoose')

// const schema = new mongoose.Schema({
//     name: { type: String },
//     parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
// })

// module.exports = mongoose.model('Category', schema);

module.exports = dynamoose => {
    const shortid = require('shortid');
    const schema = new dynamoose.Schema({
        id: {
            type: String,
            default: shortid.generate,
            hashKey: true
        },
        name: { type: String },
        parent: String,
    })

    return dynamoose.model('Category', schema);
}