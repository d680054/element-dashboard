const serverless = require('serverless-http')
const express = require('express');
const bodyParser = require('body-parser');
const app = new express();

app.use(require('cors')());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(bodyParser.json({ strict: false }));

require('./routes/admin')(app)


app.set('secret', 'SHANGHAI');


app.get('/', async(req, res) => {
    res.send('index');
})

module.exports.handler = serverless(app);