const express = require('express');
const app = new express();

app.use(require('cors')());
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)


app.set('secret', 'SHANGHAI');


app.get('/', async(req, res) => {
    res.send('index');
})


app.listen(3001, () => {
    console.log("server is running on http://localhost:3001");
});