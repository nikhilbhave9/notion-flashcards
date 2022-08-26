const express = require('express');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.urlencoded( {extended: true} ));

app.get("/", function (req, res) {
    res.send('This works!');
});


app.listen(8000);