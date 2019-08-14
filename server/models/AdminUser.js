module.exports = dynamoose => {
    const shortid = require('shortid');
    const UserSchema = new dynamoose.Schema({
        id: {
            type: String,
            default: shortid.generate,
            hashKey: true
        },
        username: {
            type: String,
            index: {
                global: true,
                project: true, // ProjectionType: ALL
                throughput: 1 // read and write are both 5
            }
        },
        password: {
            type: String,
            set(val) {
                return require('bcrypt').hashSync(val, 10);
            }
        },
    })
    return dynamoose.model('AdminUser', UserSchema);

}