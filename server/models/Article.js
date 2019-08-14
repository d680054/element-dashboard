module.exports = dynamoose => {
    const shortid = require('shortid');
    const schema = new dynamoose.Schema({
        id: {
            type: String,
            default: shortid.generate,
            hashKey: true
        },
        //categories: [{ type: dynamoose.SchemaTypes.ObjectId, ref: "Category" }],
        categories: { type: Array },
        title: { type: String },
        body: { type: String },
    })

    return dynamoose.model('Article', schema);
}