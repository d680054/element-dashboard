module.exports = app => {

    const express = require('express');
    const assert = require('http-assert');
    const jwt = require('jsonwebtoken');
    const dynamoose = require('../../plugins/db')(app)
    const AdminUser = require('../../models/AdminUser')(dynamoose)
    const router = express.Router({
        mergeParams: true
    });

    //auth middleware
    const auth = async(req, res, next) => {
        let jwtToken = String(req.headers.authorization).split(' ').pop();
        assert(jwtToken, 401, 'No jwt token')
        try {
            var { id } = jwt.verify(jwtToken, app.get('secret'));
        } catch (error) {
            assert(id, 401, 'Token is invalid');
        }

        req.user = await AdminUser.get({ id: id });
        assert(req.user, 401, 'No such user')

        await next();
    }

    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    })

    router.get('/', async(req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.scan().exec();
        res.send(items);
    })

    router.get('/:id', async(req, res) => {
        const item = await req.Model.get({ id: req.params.id });
        res.send(item);
    })

    router.put('/:id', async(req, res) => {
        const item = await req.Model.batchPut([req.body]);
        res.send(item);
    })

    router.delete('/:id', async(req, res) => {
        await req.Model.delete({ id: req.params.id });
        res.sendStatus(202);
    })


    app.use('/admin/api/rest/:resource', async(req, res, next) => {
        const ModelName = require('inflection').classify(req.params.resource);
        req.Model = require(`../../models/${ModelName}`)(dynamoose);
        next();
    }, router);



    const multer = require('multer');
    const upload = multer({ dest: __dirname + '/../../uploads' });

    app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    })

    app.post('/admin/api/login', async(req, res) => {

        const { username, password } = req.body;
        const user = await AdminUser.queryOne({ 'username': { eq: username } }).exec();
        assert(user, 401, 'authentication failed(User)');

        const isValid = require('bcrypt').compareSync(password, user.password);
        assert(isValid, 401, 'authentication failed(Password)')

        const token = jwt.sign({ id: String(user.id) }, app.get('secret'));
        res.send({
            msg: "",
            token,
            user: user.username
        })
    })


    //error handler
    app.use(async(err, req, res, next) => {
        console.log(err);
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })


}