const express = require('express');
const { Client } = require('@notionhq/client');
const BodyParser = require('body-parser');
const cors = require('cors');
var jsonParser = BodyParser.json();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(BodyParser.urlencoded( {extended: true} ));

const getFlashcards = require('./notion.js');



app.get("/flashcards", async function (req, res) {
    const flashcards = await getFlashcards();
    res.json(flashcards);
});


app.listen(PORT, console.log(`Server started on port ${PORT}`));